<template>
  <form class="cottage" @submit.prevent="setOut">
    <h2 v-bind:title="tooltip">{{ name }} — {{ books.length }} volumes left</h2>

    <input v-model.trim="name" v-focus :[dynamicAttr]="placeholder" />

    <p v-if="uiState === 'waiting'" class="hint">The family has not yet risen…</p>
    <p v-else-if="fled" class="hint">The De Laceys have fled the cottage.</p>
    <ul v-else>
      <li v-for="(book, index) in books" :key="book" v-on:click="remove(index)">
        {{ index + 1 }}. {{ book }}
      </li>
    </ul>

    <slot name="footer" :count="books.length">
      <button type="submit" :class="{ disabled: uiState === 'waiting' }">Step inside</button>
    </slot>
    <HearthClock :nights="books.length">
      <template #after="{ when }">
        <small>We meet at {{ when }}</small>
      </template>
    </HearthClock>
  </form>
</template>

<script>
import HearthClock from './HearthClock.vue';

export default {
  name: 'Cottage',
  components: { HearthClock },
  directives: {
    focus: { mounted: (el) => el.focus() },
  },
  props: {
    fled: { type: Boolean, default: false },
  },
  emits: ['set-out'],
  data() {
    return {
      name: 'The creature',
      books: ['Paradise Lost', 'Plutarch', 'Werter'],
      dynamicAttr: 'placeholder',
      glow: '#c8c6c2',
    };
  },
  computed: {
    uiState() {
      return this.$store.state.uiState;
    },
    placeholder() {
      return `Speak, ${this.name}`;
    },
    tooltip() {
      return this.fled ? 'Fled' : 'At the window';
    },
  },
  methods: {
    setOut() {
      this.$emit('set-out', this.name);
    },
    remove(index) {
      this.books.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.cottage {
  --glow: v-bind(glow);
  border-radius: 4px;
  transition: 0.3s all ease-out;
}

button {
  appearance: none;
  border: 1px solid var(--accent, #4a4a58);
  border-radius: 4px;
  background: var(--villa, #16161a);
  color: var(--glow);
  padding: 0.55rem 1.1rem;
  letter-spacing: 0.04em;
  transition:
    background 0.3s ease-out,
    box-shadow 0.3s ease-out,
    color 0.3s ease-out;
}

button:hover {
  background: #22222a;
  box-shadow: 0 0 0 1px var(--glow) inset;
}

button:focus-visible {
  outline: 2px solid var(--glow);
  outline-offset: 2px;
}

button.disabled,
button.disabled:hover {
  background: #2a2a32;
  color: #6e6e78;
  box-shadow: none;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
