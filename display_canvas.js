let circles = {}
let dragging

const diametro = 40
const CollisionFactor = 80
const k = 0.05
const restLength = 200
const curveLimit = 40

let cnvPosition = { x: window.innerWidth - window.innerWidth / 3 - 100, y: window.innerHeight * 0.05 }
let cnvSize = { width: window.innerWidth / 3, height: window.innerHeight / 2 }
let displayCnv

const isInsedeDisplayCnv = () => mouseX > cnvPosition.x && mouseX < cnvPosition.x + cnvSize.width && mouseY > cnvPosition.y && mouseY < cnvPosition.y + cnvSize.height
let showDisplayCanvas = false

let lastMousePos
let offset
let canvasOffset
let displaySf = 0.5

let selected = null

function isInsideCircle(p1, p2, r = diametro / 2) {
    const d = p5.Vector.sub(p1, p2)
    return d.mag() < r
}

function sketch1(p) {
    let cnv
    p.windowResized = function () {
        cnvPosition = { x: windowWidth - windowWidth / 3 - 100, y: windowHeight * 0.05 }
        cnvSize = { width: windowWidth / 3, height: windowHeight / 2 }

        canvasOffset = p.createVector(cnvPosition.x, cnvPosition.y)
        p.resizeCanvas(cnvSize.width, cnvSize.height)
        cnv.position(cnvPosition.x, cnvPosition.y)
    }

    p.setup = function () {
        cnv = p.createCanvas(cnvSize.width, cnvSize.height);
        cnv.position(cnvPosition.x, cnvPosition.y)

        canvasOffset = p.createVector(cnvPosition.x, cnvPosition.y)

        p.angleMode(p.DEGREES);

        lastMousePos = p.createVector(0, 0)
        offset = p.createVector(0, 0)

    }

    p.draw = function () {
        if (!showDisplayCanvas) {
            p.clear()
            return
        }
        p.background(220);
        p.scale(displaySf);
        p.translate(offset.x, offset.y)

        if (dragging) {
            dragging.circle.velocity = p.createVector(0, 0)
        }
        for (const [_, c] of Object.entries(circles)) {
            if (c.hide) continue
            for (let neighbor of c.neighbors) {
                if (!circles[neighbor]) continue
                p.line(c.pos.x, c.pos.y,
                    circles[neighbor].pos.x, circles[neighbor].pos.y)
            }
        }

        for (const [_, c] of Object.entries(circles)) {
            if (c.hide) continue
            p.strokeWeight(3);
            p.fill(255);
            if (c == selected) {
                p.fill(0)
            }
            p.circle(c.pos.x, c.pos.y, diametro)
            p.fill(0)
            p.textSize(14);
            p.textStyle(BOLD);
            p.text(c.i, c.pos.x, c.pos.y)

            c.pos.add(c.velocity)
            c.velocity.mult(0.9)
        }

        for (const [_, c] of Object.entries(circles)) {
            for (const [_, otherC] of Object.entries(circles)) {
                const d = p5.Vector.sub(c.pos, otherC.pos)
                if (d.mag() < CollisionFactor) {
                    d.normalize().mult(1)
                    c.velocity.add(d)
                    otherC.velocity.add(d.mult(-1))
                }
            }
        }

        for (const [i, c] of Object.entries(circles).reverse()) {
            for (let neighbor of [...c.neighbors, c.parent]) {
                if (!circles[neighbor]) continue
                let force = p5.Vector.sub(circles[i].pos, circles[neighbor].pos)
                let x = force.mag() - restLength
                force.normalize();
                force.mult(-1 * k * x);

                circles[i].velocity.add(force)
                circles[neighbor].velocity.add(force.mult(-1))

                for (let otherNeighbor of [...c.neighbors, c.parent]) {
                    if (circles[otherNeighbor] === circles[neighbor] || !circles[otherNeighbor]) continue
                    const p1 = p5.Vector.sub(circles[neighbor].pos, c.pos)
                    const p2 = p5.Vector.sub(circles[otherNeighbor].pos, c.pos)
                    const angle1 = p1.angleBetween(p.createVector(1, 0))
                    const angle2 = p2.angleBetween(p.createVector(1, 0))
                    let angleDir = 180
                    if (p1.angleBetween(p2) < 0) {
                        angleDir = 0
                    }

                    if (p.abs(p1.angleBetween(p2)) < 80 - ([...c.neighbors, c.parent].length) - 1) {
                        const a = p.createVector(p.sin(angle2 + angleDir), p.cos(angle2 + angleDir))
                        const b = p.createVector(p.sin(angle1 + 180 - angleDir), p.cos(angle1 + 180 - angleDir))
                        a.mult(restLength)
                        b.mult(restLength)
                        a.sub(p1).normalize()
                        b.sub(p2).normalize()
                        circles[neighbor].velocity.add(a)
                        circles[otherNeighbor].velocity.add(b)
                    }
                }
            }
        }
    }

    p.mousePressed = function (event) {
        if (!isInsedeDisplayCnv()) return
        const click = p.createVector(event.x, event.y).sub(canvasOffset).div(displaySf).sub(offset)

        for (const [index, c] of Object.entries(circles).reverse()) {
            if (isInsideCircle(c.pos, click)) {
                dragging = {
                    index: circles.length - 1 - index,
                    circle: c
                }
                break
            }

        }

        lastMousePos = p.createVector(event.x, event.y)
    }

    p.mouseDragged = function (event) {
        if (!isInsedeDisplayCnv()) return
        const click = p.createVector(event.x, event.y).sub(canvasOffset).div(displaySf).sub(offset)

        if (dragging) {
            dragging.circle.pos = click
        } else {
            offset.add(p.createVector(event.x - lastMousePos.x, event.y - lastMousePos.y))
        }

        lastMousePos = p.createVector(event.x, event.y)
    }

    p.mouseReleased = function () {
        dragging = undefined
        p.lastMousePos = p.createVector(0, 0)
    }
}

window.addEventListener("wheel", function (e) {
    if (isInsedeDisplayCnv()) {
        if (e.deltaY < 0)
            displaySf *= 1.05;
        else
            displaySf *= 0.95;
    } else {
        if (e.deltaY < 0)
            sf *= 1.05;
        else
            sf *= 0.95;

    }
});

sleep(100).then(() => new p5(sketch1))
