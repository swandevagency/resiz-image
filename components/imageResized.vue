<template>
  <div class="image-resize-wrapper">
    <h1>image resize</h1>
    <div class="image-resize">
      <input type="file" id="input-file" 0 ref="input" />
    </div>
    <button @click="process()">process</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    process() {
      const fileInputElement = this.$refs.input as any
      const file = fileInputElement.files[0]

      if (!file) return

      // reading the file and doing changing it
      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onload = function (event: any) {
        console.log('preview', event.target.result)

        const imgElement = document.createElement('img') as any
        imgElement.src = event.target?.result
        const imageInputElement = document.querySelector('#input-image') as any

        imageInputElement.src = event.target?.result

        //for small image
        imageInputElement.onload = function (e: any) {
          const canvas = document.createElement('canvas') as any
          const maxWidth = 420

          const scaleSize = maxWidth / e.target.width
          canvas.width = maxWidth
          canvas.height = e.target.height * scaleSize

          const ctx = canvas.getContext('2d')
          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)

          // you can send the srcEncoded to the server
          const srcEncoded = ctx.canvas.toDataURL(e.target, 'image/png', 10)
          console.log(srcEncoded, 'adsfkljsdafkljsadf')

          // const smallImageElement = document.querySelector(
          //   '#output-small-image'
          // ) as any
          // smallImageElement.src = srcEncoded
        }
      }
    },
  },
})
</script>
