'use strict'

module.exports = function (ac, value) {
  value = (value || value === 0) ? value : 1
  var buffer = ac.createBuffer(1, 2, ac.sampleRate)
  var data = buffer.getChannelData(0)
  data[0] = data[1] = value
  var source = ac.createBufferSource()
  source.buffer = buffer
  source.loop = true
  return source
}
