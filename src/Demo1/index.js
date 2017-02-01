import tetryon from 'tetryon'
const { core, math, services, util } = tetryon
const { randomFloat } = math
const { Component, Game } = core
const { Vec2, Color } = util
const { types } = Component

const game = new Game()
const renderer = new services.CanvasRenderer({ fullscreen: true })

const {
  Transform,
  Physics,
  Renderable,
} = game.addComponentTypes({
  Transform: {
    position: Vec2,
    scale: types.number,
  },
  Physics: {
    velocity: Vec2,
  },
  Renderable: {
    fill: types.string,
    stroke: types.string,
    radius: types.number,
  },
})

game.addSystems({
  physics: {
    dependencies: [Transform, Physics],
    each(e) {
      const t = e.get(Transform)
      const p = e.get(Physics)

      t.position.x += (p.velocity.x * game.time.elapsed * (1 / (t.scale / 5)))
      t.position.y += (p.velocity.y * game.time.elapsed * (1 / (t.scale / 5)))

      if (t.position.x < 0) {
        t.position.x = 0
        p.velocity.x *= -1
      } else if (t.position.x > renderer.width) {
        t.position.x = renderer.width
        p.velocity.x *= -1
      }

      if (t.position.y < 0) {
        t.position.y = 0
        p.velocity.y *= -1
      } else if (t.position.y > renderer.height) {
        t.position.y = renderer.height
        p.velocity.y *= -1
      }
    },
  },

  render: {
    dependencies: [Transform, Renderable],
    before() {
      renderer.clear()
    },
    each(e) {
      const t = e.get(Transform)
      const r = e.get(Renderable)

      renderer.drawCircle(
        t.position.x,
        t.position.y,
        r.radius * t.scale,
        r.fill,
        r.stroke
      )
    },
  },
})

function randomCircle() {
  const w2 = renderer.width / 2
  const h2 = renderer.height / 2

  game.entity()
    .add(Transform, Vec2(w2, h2), randomFloat(2, 24))
    .add(Physics, Vec2(randomFloat(-400, 400), randomFloat(-400, 400)))
    .add(Renderable, Color.random().toString(), Color.random().toString(), 1)
}

const numCircles = 3200

export default function demo1() {
  game.init()
  game.start()
  for (let i = 0; i < numCircles; i++) { randomCircle() }
  return game
}

export const actions = {
  addCircle: randomCircle,
}
