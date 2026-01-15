<script lang="ts">
  import VirtualTourViewer from '$lib/components/virtual-tour-viewer.svelte';
  import Section from '$lib/components/ui/section.svelte';
  import Stage from '$lib/components/ui/stage.svelte';
  import { m } from '$lib/paraglide/messages';
  import '@photo-sphere-viewer/core/index.css';
  import '@photo-sphere-viewer/virtual-tour-plugin/index.css';
  import type { VirtualTourNode } from '@photo-sphere-viewer/virtual-tour-plugin';

  const nodes: VirtualTourNode[] = [
    {
      id: 'room-1',
      name: 'Büro',
      panorama: '/tour/buero.JPG',
      sphereCorrection: {
        pan: '45deg',
        tilt: '-3deg',
        roll: '3deg'
      },
      links: [{ nodeId: 'room-2', position: { yaw: '80deg', pitch: '10deg' } }]
    },
    {
      id: 'room-2',
      name: 'Flur / Durchgang',
      panorama: '/tour/flur-vorne.JPG',
      sphereCorrection: {
        pan: '203deg',
        tilt: '0deg',
        roll: '20deg'
      },
      links: [
        { nodeId: 'room-3', position: { yaw: '170deg', pitch: '0deg' } },
        { nodeId: 'room-4', position: { yaw: '50deg', pitch: '0deg' } },
        { nodeId: 'room-1', position: { yaw: '-105deg', pitch: '0deg' } }
      ]
    },
    {
      id: 'room-3',
      name: 'Zoes Zimmer',
      panorama: '/tour/zoes-zimmer.JPG',
      sphereCorrection: {
        pan: '80deg',
        tilt: '0deg',
        roll: '5deg'
      },
      links: [{ nodeId: 'room-2', position: { yaw: '-5deg', pitch: '-10deg' } }]
    },
    {
      id: 'room-4',
      name: 'Flur zum Bad',
      panorama: '/tour/flur.JPG',
      sphereCorrection: {
        pan: '200deg',
        tilt: '3deg',
        roll: '10deg'
      },
      links: [
        { nodeId: 'room-5', position: { yaw: '80deg', pitch: '0deg' } },
        { nodeId: 'room-6', position: { yaw: '0deg', pitch: '0deg' } },
        { nodeId: 'room-2', position: { yaw: '255deg', pitch: '0deg' } }
      ]
    },
    {
      id: 'room-5',
      name: 'Badezimmer',
      panorama: '/tour/badezimmer.JPG',
      sphereCorrection: {
        pan: '190deg',
        tilt: '0deg',
        roll: '0deg'
      },
      links: [{ nodeId: 'room-4', position: { yaw: '-95deg', pitch: '0deg' } }]
    },
    {
      id: 'room-6',
      name: 'Schlafzimmer',
      panorama: '/tour/schlafzimmer.JPG',
      sphereCorrection: {
        pan: '300deg',
        tilt: '0deg',
        roll: '10deg'
      },
      links: [{ nodeId: 'room-4', position: { yaw: '135deg', pitch: '-25deg' } }]
    }
  ];
</script>

<Section fullWidth={true} noSpacing={true}>
  <div class="flex flex-col justify-center items-center py-8 px-24" >
    <VirtualTourViewer {nodes} startNodeId="room-1" />
  </div>
</Section>

<!-- <section class="appointment-content-wrapper">
  <Stage style={'basic-gradient'}>
    <div class="inner-box reduced prose py-36">
      <h1 class="massive animate-fade-in-up">{m['appointment.title']()}</h1>
      <p class="teaser animate-fade-in-up">{m['appointment.subtitle']()}</p>
    </div>
  </Stage>

  <div class="spacer"></div>

  <Section customColor={'#fafafa'} noSpacing={true}>
    <iframe src="https://calendly.com/raspb-webservices/erstgespraech?hide_gdpr_banner=1" title="Termin vereinbaren" width="100%" height="900"></iframe>
  </Section>
</section> -->

<style lang="postcss">
  @reference '../../app.css';
</style>
