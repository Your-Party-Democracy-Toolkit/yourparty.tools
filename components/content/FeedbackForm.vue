<script>
  const toast = useToast()

  export default {
    methods: {
      submitForm() {
        this.$formkit.submit('contact')
      },
      submitToAPI(data) {
        $fetch('/api/formEmail', {
          method: 'POST',
          body: data
        }).then(() => {
          toast.success({ title: 'Thanks for your feedback!' })
        }).catch((e) => {
          toast.error({ title: 'There was an error submitting your feedback.', description: e.message })
        })
      },
    },
  }
</script>


<template>
  <FormKit id="contact" type="form" @submit="submitToAPI" class="w-full">
    <FormKit type="text" name="contactMethod" label="Contact details" />
    <FormKit type="textarea" name="message" label="Message" />
  </FormKit>
</template>