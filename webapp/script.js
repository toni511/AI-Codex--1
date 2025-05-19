// Basic Jenga game using Matter.js
const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

const engine = Engine.create();
const world = engine.world;

const canvas = document.getElementById('world');
const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false
    }
});

// ground
const ground = Bodies.rectangle(400, 590, 810, 40, { isStatic: true });
World.add(world, ground);

function createJengaTower(x, y, rows) {
    const blocks = [];
    const blockWidth = 60;
    const blockHeight = 20;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < 3; j++) {
            const offset = (i % 2 === 0) ? j * blockWidth : j * blockWidth - blockWidth;
            const block = Bodies.rectangle(x + offset, y - i * blockHeight, blockWidth, blockHeight, {
                restitution: 0.1,
                friction: 0.5,
                render: { fillStyle: '#DEB887' }
            });
            blocks.push(block);
        }
    }
    World.add(world, blocks);
}

createJengaTower(400, 550, 18);

// mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});
World.add(world, mouseConstraint);

Engine.run(engine);
Render.run(render);

// reset button
const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', () => {
    World.clear(world);
    Engine.clear(engine);
    World.add(world, ground);
    createJengaTower(400, 550, 18);
});
