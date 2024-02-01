<template>
  <div>
    <div class="info-modal-wrapper">
      <div class="row">
        <div class="col-12 text-right" v-if="closable">
          <img src="../assets/svg/close-circle.svg" alt="Close" @click="hideModal" style="cursor: pointer;">
        </div>
        <div class="col-12 title">
          <slot name="title"></slot>
        </div>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>

    <div class="modal-background" v-if="showBackground"></div>
  </div>
</template>

<script lang="ts">
export default {
    props: {
        data: {
            type: Object,
        },
        closable: {
          type: Boolean,
          default: true
        },
        showBackground: {
          type: Boolean,
          default: false,
        }
    },
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
        hideModal() {
            this.$emit('hideModal');
        },
    },
    created() {
    }
}
</script>
