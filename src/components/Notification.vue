<template>
    <div class="notification-wrapper" :class="[type === 'success' ? 'success' : 'error']" v-if="is_open">
        <div class="icon">
            <img src="../assets/svg/success.svg" alt="Success" v-if="type === 'success'">
            <img src="../assets/svg/error.svg" alt="Error" v-else>
        </div>
        <div class="content">
            <p class="title mt-1">{{ title }}</p>
            <p class="description">{{ description }}</p>
        </div>
    </div>
</template>
<script lang="ts">

export default {
    name: '',
    components: {},
    data() {
        return {
            is_open: false,
            title: "",
            description: "",
            type: ""
        }
    },
    mounted() {
    this.$eventBus.$on("showNoti", (e: any) => {
      this.showNoti(e);
    });
  },
  destroyed() {
    this.$eventBus.$off("showNoti");
  },
    methods: {
        showNoti(e: any) {
            this.title = e.title;
            this.description = e.description;
            this.type = e.type;
            this.is_open = true;
            setTimeout(() => {
                this.is_open = false;
            }, e.duration)
        }
    }
}
</script>
