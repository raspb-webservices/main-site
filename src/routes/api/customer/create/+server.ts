import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Customer } from '$interfaces/customer.interface';
import auth from '$lib/../authService';

const GRAPHQL_ENDPOINT = 'https://api-eu-west-2.hygraph.com/v2/cm20c164y00dh07ut82c04dgs/master';
const GRAPHQL_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3NTQ2NjI4NTcsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY20yMGMxNjR5MDBkaDA3dXQ4MmMwNGRncy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiOTMzNGUyYmYtMzYxOS00NTZjLThjNjQtOTU1Y2NjMTcxOGExIiwianRpIjoiY21lMnd5bTZoMGVyZzA2bGY4MG00YTFzbiJ9.AuC6AbSJgqiXDla2zhoOop87hxc-qZfEkXQAhQ6yhy1JQBKDNr1nqCpowic3scew8EgUKo9K1VsmPgteW6S2ZLNsIC1C-YCHFyv1FvnKvtWHzn4nN8urtg7-ptegnE97pSkg-DEYt1Dck-5i7yBRXWWHPvzslCRxWQjbbJ2Dfv-gYFPqCl13WNpwR1NAmYH7-_UuVW1CFiXpHwS-7mXT1u6ByQXGf7N1eHWg6D2aa3DLrT4YFQgvstFi305pvFd6PiFtZjKKpFayWwOOJa3DSpMb2Q_IoRUnNtfTt28U9FIegMV-W52Ic4KxA-il-AZYvjmGZRRYPRJynVmYzTm387eWiagdLeBEqjpHCEU63ELEjHKuLy94l2dAs8Rio09_LuimhORGxxGZwCVlDIcC-Wv-d1WYkNZB2oNeNjO93mnE48is7UQipCJiHNJ7MYLKkLvlbTTdP_qDklZ9tAho7op7_x68Pq4cGCz4qlqMmMrMt2sDrFHfj0dsrSrIKbH7_uN6vUPzZsGHvuFbJL5xCMI_R2yHnRW79mfXu92iHgJQNsg9iMpO1jHD9F710GNMjHBmA7vTA21al2njE_hwTRH8Je4Zca-_8NMeUhEeI7YcGqyu0HrJwi1OCdcsRl2ybj3qbat7Domu9MVUVbieE_SMUITUk7RdqXfbM0c6tBM';

async function graphqlRequest(query: string, variables: any = {}) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GRAPHQL_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(`GraphQL error: ${result.errors.map((e: any) => e.message).join(', ')}`);
  }

  return result.data;
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const customerData: Partial<Customer> = await request.json();

    // Validierung der Pflichtfelder
    if (!customerData.givenName?.trim()) {
      return json(
        {
          success: false,
          error: 'Vorname ist erforderlich',
          details: ['Das Feld "Vorname" darf nicht leer sein.']
        },
        { status: 400 }
      );
    }

    if (!customerData.familyName?.trim()) {
      return json(
        {
          success: false,
          error: 'Nachname ist erforderlich',
          details: ['Das Feld "Nachname" darf nicht leer sein.']
        },
        { status: 400 }
      );
    }

    if (!customerData.email?.trim()) {
      return json(
        {
          success: false,
          error: 'E-Mail-Adresse ist erforderlich',
          details: ['Das Feld "E-Mail-Adresse" darf nicht leer sein.']
        },
        { status: 400 }
      );
    }

    // E-Mail-Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerData.email)) {
      return json(
        {
          success: false,
          error: 'Ungültige E-Mail-Adresse',
          details: ['Bitte geben Sie eine gültige E-Mail-Adresse ein.']
        },
        { status: 400 }
      );
    }

    // Prüfen, ob Customer bereits existiert (basierend auf E-Mail)
    const existingCustomerQuery = `
      query GetCustomerByEmail($email: String!) {
        customers(where: { email: $email }) {
          id
          email
          givenName
          familyName
        }
      }
    `;

    const existingCustomerResult = await graphqlRequest(existingCustomerQuery, {
      email: customerData.email
    });

    // Wenn Customer bereits existiert, gib die vorhandene ID zurück
    if (existingCustomerResult.customers && existingCustomerResult.customers.length > 0) {
      const existingCustomer = existingCustomerResult.customers[0];
      console.log('Customer bereits vorhanden:', existingCustomer.id);

      return json({
        success: true,
        data: {
          id: existingCustomer.id,
          email: existingCustomer.email,
          givenName: existingCustomer.givenName,
          familyName: existingCustomer.familyName,
          isExisting: true
        },
        message: 'Customer bereits vorhanden'
      });
    }

    // Create Auth0 user if password is provided
    let auth0UserId: string | undefined;
    if (customerData.password && customerData.password.trim()) {
      try {
        const auth0User = await auth.createAuth0User({
          email: customerData.email.trim(),
          password: customerData.password.trim(),
          givenName: customerData.givenName.trim(),
          familyName: customerData.familyName.trim(),
          user_metadata: customerData.user_metadata
        });

        auth0UserId = auth0User.user_id;
        console.log('Auth0 user created:', auth0UserId);
      } catch (auth0Error) {
        console.error('Error creating Auth0 user:', auth0Error);
        // Don't fail the entire process if Auth0 user creation fails
      }

      if (auth0UserId) {
        try {
          const roleAssignmentResponse = await auth.assignRole(auth0UserId, ['rol_eqqXJZxCRsW8zLRt']);
          console.log('roleAssignmentResponse:', roleAssignmentResponse);
        } catch (auth0Error) {
          console.error('Error assign role to Auth0 user:', auth0Error);
        }
      }
    }

    // Customer erstellen
    const createCustomerMutation = `
      mutation CreateCustomer($data: CustomerCreateInput!) {
        createCustomer(data: $data) {
          id
          email
          givenName
          familyName
          salutation
          company
          phone
          address
          postCode
          city
          country
          auth0Id
          createdAt
        }
      }
    `;

    const customerInput = {
      email: customerData.email.trim(),
      givenName: customerData.givenName.trim(),
      familyName: customerData.familyName.trim(),
      ...(auth0UserId && { auth0Id: auth0UserId }),
      ...(customerData.salutation && { salutation: customerData.salutation }),
      ...(customerData.company && { company: customerData.company.trim() }),
      ...(customerData.phone && { phone: customerData.phone.trim() }),
      ...(customerData.address && { address: customerData.address.trim() }),
      ...(customerData.postCode && { postCode: customerData.postCode.trim() }),
      ...(customerData.city && { city: customerData.city.trim() }),
      ...(customerData.country && { country: customerData.country })
    };

    const result = await graphqlRequest(createCustomerMutation, {
      data: customerInput
    });

    if (result.createCustomer) {
      console.log('Customer erfolgreich erstellt:', result.createCustomer.id);

      return json({
        success: true,
        data: {
          ...result.createCustomer,
          isExisting: false
        },
        message: 'Customer erfolgreich erstellt'
      });
    } else {
      throw new Error('Customer konnte nicht erstellt werden');
    }
  } catch (error) {
    console.error('Fehler beim Erstellen des Customers:', error);

    let errorMessage = 'Unbekannter Fehler beim Erstellen des Customers';
    let errorDetails: string[] = [];

    if (error instanceof Error) {
      errorMessage = error.message;

      // Spezifische Hygraph-Fehler behandeln
      if (error.message.includes('duplicate')) {
        errorMessage = 'Ein Customer mit dieser E-Mail-Adresse existiert bereits';
        errorDetails.push('Bitte verwenden Sie eine andere E-Mail-Adresse oder kontaktieren Sie uns direkt.');
      } else if (error.message.includes('validation')) {
        errorMessage = 'Validierungsfehler bei den Customer-Daten';
        errorDetails.push('Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.');
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Netzwerkfehler beim Erstellen des Customers';
        errorDetails.push('Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.');
      }
    }

    return json(
      {
        success: false,
        error: errorMessage,
        details: errorDetails.length > 0 ? errorDetails : ['Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.']
      },
      { status: 500 }
    );
  }
};
