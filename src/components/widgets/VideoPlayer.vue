<template>
  <div>
    <div :id="playerId" class="w-full"></div>
  </div>
</template>

<script>
export default {
  props: ['videoId'],
  data() {
    return {
      playerId: 'player-' + Math.random().toString(36).substr(2, 9),
      player: null,
      apiLoaded: false
    }
  },
  mounted() {
    if (!this.apiLoaded) {
      this.loadYouTubePlayerAPI()
      this.apiLoaded = true
    }
  },
  methods: {
    loadYouTubePlayerAPI() {
      if (!this.apiLoaded) {
        var tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        tag.onload = () => {
          this.apiLoaded = true
          this.createYouTubePlayer()
        }
        var firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      }
    },
    createYouTubePlayer() {
      var self = this
      window.onYouTubeIframeAPIReady = function () {
        self.player = new YT.Player(self.playerId, {
          videoId: self.videoId,
          width: '100%',
          playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0
          }
        })
      }

      if (typeof YT !== 'undefined' && YT.loaded) {
        window.onYouTubeIframeAPIReady()
      }
    }
  },

  created() {
    this.createYouTubePlayer()
  }
}
</script>
