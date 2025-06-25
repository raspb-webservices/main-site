<script lang="ts">
  let { firstname, lastname } = $props();
  $effect(() => {
    console.log("Effect ran");
    if(firstname === "Maggus") {
      console.log("Hello Maggus");
    }
    return () => {
      console.log("Callback: Effect re-run or deleted component!")
      console.log("Callbackj: Functionality!")
    }
  })
</script>

<h1>Hallo {firstname}</h1>
<h2>Du heißt {lastname}</h2>
