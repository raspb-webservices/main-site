<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<section class="kontakt-content-wrapper">
  <h1>Kontakt</h1>
  <div class="px-20 pt-10">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio hic voluptatem neque consequuntur porro, accusantium sit, doloribus perferendis, reiciendis
      autem labore. Minus explicabo aperiam ratione sapiente voluptate aliquam cum est.
    </p>

    <div class="spacer"></div>

    <form name="contact" method="POST" action="/danke" netlify>
      <input type="hidden" name="form-name" value="contact" />

      <div class="form-field-container">
        <div class="form-field-section">
          <label for="first-name">Vorname</label>
          <input type="text" id="first-name" name="first-name" placeholder="Max" required />
        </div>
        <div class="form-field-section">
          <label for="last-name">Nachname</label>
          <input type="text" id="last-name" name="last-name" placeholder="Mustermann" required />
        </div>
      </div>

      <div class="form-field-container">
        <div class="form-field-section full-width">
          <label for="email">E-Mail-Adresse</label>
          <input type="email" id="email" name="email" placeholder="max.musterman@beispiel.de" required />
        </div>
      </div>

      <div class="form-field-container">
        <div class="form-field-section full-width">
          <label for="phone">Telefonnummer</label>
          <input type="tel" id="phone" name="phone" placeholder="0123-456789" />
        </div>
      </div>

      <div class="form-field-container">
        <div class="form-field-section full-width">
          <label for="message">Ihre Nachricht an uns</label>
          <span class="additional-information"></span>
          <textarea id="message" name="message" rows="4" placeholder="" required></textarea>
        </div>
      </div>

      <div class="form-field-container">
        <div class="form-field-section full-width checkbox-dialog">
          <input id="dsgvo" name="dsgvo" type="checkbox" value="" class="is-checkbox accent-secondary" required />
          <label for="dsgvo">Ich stimme der Speicherung und Verarbeitung meiner Daten durch diese Website zu</label>
        </div>
      </div>
      <div class="medium-spacer"></div>
      <button type="submit" class="btn-basic">Abschicken</button>
    </form>
  </div>
  <div class="big-spacer"></div>
</section>

<style lang="postcss">
    @reference '../../app.css';
  section.kontakt-content-wrapper {
    @apply m-auto h-full w-full max-w-7xl px-4 py-12;
    form {
      @apply w-full max-w-4xl pb-2;
      .form-field-container {
        @apply mb-4 grid w-full gap-6 md:grid-cols-2;
        .form-field-section {
          &.full-width {
            @apply col-span-full;
          }
          &.checkbox-dialog {
            @apply flex h-6 items-center;
            label {
              @apply !mb-0 !ml-3 cursor-pointer;
              &:hover {
                @apply text-mediumGrey;
              }
            }
          }
          label {
            @apply mb-1 block text-base text-darkGrey;

            &[for='first-name'],
            &[for='last-name'],
            &[for='email'],
            &[for='phone'],
            &[for='message'] {
              @apply pl-0.5 font-bold;
            }
          }
          input,
          textarea {
            @apply mt-1 block w-full border border-mediumGrey bg-white p-3 text-sm text-darkGrey focus:border-secondary focus:ring-secondary;
          }
          input.is-checkbox {
            @apply mt-0 h-6 w-6 p-0 focus:ring-1 focus:ring-primary;
          }

          .additional-information {
            @apply text-sm text-mediumGrey;
          }
        }
      }
    }
  }
</style>
