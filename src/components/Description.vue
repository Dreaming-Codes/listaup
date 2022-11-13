<script lang="ts" setup>
import {useAnimStateStore} from "../stores/animState";
import GlitchedWriter from "vue-glitched-writer";
import {computed} from "vue";

const animStore = useAnimStateStore();

const getCurrentText = computed(() => {
  return animStore.animText.find((text) => {
    return text.range[0] <= animStore.scrollPercent && text.range[1] >= animStore.scrollPercent;
  })
})

const glitchedWriterOptions = {
  letterize: true,
};
</script>

<template>
  <Transition name="fromdown">
    <div v-if="getCurrentText" class="container glitchedEffect">
      <GlitchedWriter :text="getCurrentText.title" :options="glitchedWriterOptions" appear class="text title"></GlitchedWriter>
      <br>
      <a :href="'mailto:' + getCurrentText.email" target="_blank">
        <GlitchedWriter :text="getCurrentText.email" :options="glitchedWriterOptions" appear class="text email"></GlitchedWriter>
      </a>
    </div>
  </Transition>
</template>

<style scoped>
.container {
  position: fixed;
  bottom: 0;
  height: 25vh;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.58) 100%);
  width: 100%;
  font-family: 'Roboto Mono', monospace;
  text-align: center;
  overflow: hidden;
  padding-top: 5vh;
}

.text {
  font-weight: 100;
  color: #FAFAFA;
}

.title {
  font-size: 10vmin;
}

.email {
  font-size: 5vmin;
}

a {
  text-decoration: none;
}
</style>
<style lang="scss">
$light-blue: #a5e5d4;
$blue: #42c3c8;
$pink: #d93da5;
$black: #1d1e22;

@mixin text-shadow($color) {
  text-shadow: 2px 4px 10px rgba($color, 0.5);
}
@mixin font-family {
  font-family: "M PLUS 1p", "Open Sans", sans-serif;
}

.glitchedEffect {
  .text {
    position: relative;
    color: $light-blue;
    will-change: contents, width;

    @include font-family;
    @include text-shadow($light-blue);

    &::after,
    &::before {
      content: attr(data-gw-string);
      position: absolute;
      opacity: 0;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 30px;
      overflow: hidden;
      white-space: nowrap;
      color: $blue;
      will-change: contents, width;
    }
    &::before {
      z-index: -1;
      color: $pink;
    }
    &.gw-writing {
      animation: glitch-skew 1s steps(10, end) infinite alternate-reverse;

      .gw-ghosts, .gw-glitched {
        opacity: 0.6;
        animation: glitch-blink 1s steps(20, end) infinite alternate-reverse;
      }

      &::after,
      &::before {
        opacity: 1;
      }
      &::after {
        animation: glitch-animation-1 1.5s steps(20, end) infinite
        alternate-reverse;
      }
      &::before {
        animation: glitch-animation-2 2s steps(20, end) infinite alternate-reverse;
      }
    }
    @keyframes glitch-skew {
      $steps: 10;

      @for $i from 0 through $steps {
        #{percentage($i * 1 / $steps)} {
          transform: skew(random(10) - 5 + deg);
        }
      }
    }
    @keyframes glitch-blink {
      $steps: 20;

      @for $i from 0 through $steps {
        #{percentage($i * 1 / $steps)} {
          opacity: random(10) / 10;
        }
      }
    }
    @keyframes glitch-animation-1 {
      $steps: 20;

      @for $i from 0 through $steps {
        #{percentage($i * 1 / $steps)} {
          clip: rect(random(100) + px, 1000px, random(100) + px, 0);
          transform: skew(random(16) - 8 + deg) translatex(random(30) - 15 + px);
        }
      }
    }
    @keyframes glitch-animation-2 {
      $steps: 20;

      @for $i from 0 through $steps {
        #{percentage($i * 1 / $steps)} {
          clip: rect(random(100) + px, 1000px, random(100) + px, 0);
          transform: skew(random(10) - 5 + deg) translatex(random(20) - 10 + px);
        }
      }
    }
  }
}
</style>
