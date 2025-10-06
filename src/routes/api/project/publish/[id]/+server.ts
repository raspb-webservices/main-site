import { client } from '$lib/server/graphql-client';
import { gql } from 'graphql-request';
import { json } from '@sveltejs/kit';

async function publishProject(id: string) {
  try {
    console.log(`Publishing project with ID: ${id}`);

    const query = gql`
      mutation publishProject($id: ID!) {
        publishProject(where: { id: $id }, to: PUBLISHED) {
          id
          stage
        }
      }
    `;

    const variables = { id };
    const response = (await client.request(query, variables)) as any;

    console.log('Project publish response:', response);

    if (response?.publishProject?.id) {
      return {
        success: true,
        data: response.publishProject,
        message: 'Project successfully published'
      };
    } else {
      throw new Error('No project returned from publish mutation');
    }
  } catch (error) {
    console.error('Error publishing project:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      details: error
    };
  }
}

export const GET = async ({ params }) => {
  const id = params.id;

  if (!id) {
    return json({ success: false, error: 'Project ID is required' }, { status: 400 });
  }

  const result = await publishProject(id);

  if (result.success) {
    return json(result);
  } else {
    return json(result, { status: 500 });
  }
};

export const POST = async ({ params }) => {
  const id = params.id;

  if (!id) {
    return json({ success: false, error: 'Project ID is required' }, { status: 400 });
  }

  const result = await publishProject(id);

  if (result.success) {
    return json(result);
  } else {
    return json(result, { status: 500 });
  }
};
