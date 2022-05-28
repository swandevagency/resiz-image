<template>
  <div class="home-page-wrapper">
    <h1>image resize</h1>
    <div class="image-resize">
      <input @change="process" type="file" id="input-file" multiple="false" />
      <input type="text" id="input-file" v-model="alt" />
    </div>
    <!-- <ImageResized /> -->
    <img id="input-image" class="yo" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      alt: '',
      image: {
        s: '' as string,
        m: '' as string,
        l: '' as string,
      },
    }
  },
  methods: {
    process(event: any) {
      const file = event.target.files[0]
      const fileSize = file.size
      console.log(file)

      if (!file) return

      // reading the file and doing changing it
      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onload = function (event: any) {
        const src = event.target.result

        const canvas = document.createElement('canvas') as any
        const maxWidth = 420

        const imgElement = document.createElement('img') as any
        imgElement.src = src
        const imageInputElement = document.querySelector('#input-image') as any

        imageInputElement.src = event.target?.result

        // for small image
        imageInputElement.onload = function (e: any) {
          const scaleSize = maxWidth / e.target.width
          canvas.width = maxWidth
          canvas.height = e.target.height * scaleSize

          const ctx = canvas.getContext('2d')
          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)

          const compressPer = (data: number) => {
            const result = 10000000 / data
            if (Math.trunc(result) >= 100) {
              console.log('more than 100', Math.trunc(result))
              return 100
            } else if (Math.trunc(result) < 1) {
              console.log('less than one', Math.trunc(result))
              return 1
            } else {
              console.log(Math.trunc(result))
              return Math.trunc(result)
            }
            // return result
          }

          const srcEncoded = ctx.canvas.toDataURL(
            e.target,
            'image/jpg',
            compressPer(fileSize)
          )
          // you can file the srcEncoded to the server
          const file = new File([srcEncoded], 'file', { type: 'image/jpg' })
          console.log(file, 'adsfkljsdafkljsadf')
        }
      }
    },
  },
})
</script>
<style scoped>
.yo {
  display: none !important;
}
</style>
