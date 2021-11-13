
// Notes 
// https://www.kkhaydarov.com/audio-visualizer/
// https://medium.com/@duraraxbaccano/computer-art-visualize-your-music-in-javascript-with-your-browser-part-2-fa1a3b73fdc6


// Import a renderer 
import CircleRenderer from './CircleRenderer.js';


// --------------------------------------------------------
// Canvas

// Get reference to the canvas context for use by the 
// renderers below
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


// ----------------------------------------------------------
// Buttons 
const playButton = document.getElementById('button-play')
const pauseButton = document.getElementById('button-pause')

playButton.addEventListener('click', (e) => {
	startAudio()
})

pauseButton.addEventListener('click', (e) => {
	audio.pause()
})


// --------------------------------------------------------
// Audio setup

// Defime some variables 
let analyser
let frequencyArray
let audio

// Starts playing the audio
function startAudio() {
	// make a new Audio Object
	audio = new Audio()
	// Get a context 
	const audioContext = new (window.AudioContext || window.webkitAudioContext)()
	
	// Define a source sound file 
	// You can replace this with your own file
	audio.src = 'bird-whistling-a.wav'
	// audio.src = 'log-sine-sweep.wav'

	// Make a new analyser
	analyser = audioContext.createAnalyser()
	// Connect the analyser and the audio
	const source = audioContext.createMediaElementSource(audio)
	source.connect(analyser)
	analyser.connect(audioContext.destination)

	// Get an array of audio data from the analyser
	frequencyArray = new Uint8Array(analyser.frequencyBinCount)
	// console.log(frequencyArray.length)
	
	// Start playing the audio
	audio.play()

	requestAnimationFrame(render)
}

// This function renders the audio to the canvas using a renderer
function render() {
	analyser.getByteFrequencyData(frequencyArray)
	
	
	CircleRenderer(frequencyArray, ctx, 1000, 1000)

	// Set up the next animation frame
	requestAnimationFrame(render)
}

