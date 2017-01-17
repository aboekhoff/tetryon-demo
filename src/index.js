import Demo1 from './Demo1'
import Inspector from './Inspector'

let tetryon = Demo1()

const inspector = new Inspector({
  Tetryon: {
    start: () => { tetryon.start() },
    stop: () => { tetryon.stop() },
    tick: () => { tetryon.tick() },
  },
})

console.log(inspector)

inspector.render()
