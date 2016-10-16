let isDragging = false;
let $dom;
let offsetX;
let offsetY;

const GLOBAL_VARS = {
  opacity: 1.0,
};

$(() => {

  $(".circle").on("mousedown touchstart", (e) => {
    isDragging = true;
    $dom = $(e.target);
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });

  $(".wrapper").on("mousemove", (e) => {
    if (isDragging && $dom) {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      requestAnimationFrame(() => {
        $dom.css({
          top: `${y}px`,
          left: `${x}px`,
        })

        const id = $dom.attr("id");
        $(`#${id}0`).css({
          top: `${y + 200}px`,
          left: `${x}px`,
        })
        $(`#${id}00`).css({
          top: `${y + 200 * 2}px`,
          left: `${x}px`,
        })
      });
    }
  });

  $(".wrapper").on("mouseup touchend", () => {
    isDragging = false;
    $dom = null;
  });

  const gui = new dat.GUI();
  gui.add(GLOBAL_VARS, "opacity", 0, 1.0).step(0.01).onChange((val) => {
    $(".circle").css({
      opacity: val,
    });
  });

  const step = 0.05;
  _.range(0, 1 + step, step).forEach((n) => {
    n = floatFormat(n, 2);
    console.log("\n");
    console.log(n);
    console.log(0+n*18+-7);
    const item = $("<div>").addClass("list-item").css({opacity: n});
    $(".list").append(item);
    const item2 = $("<div>").addClass("list-item").css({opacity: n});
    $(".list-2").append(item2);
    const item3 = $(`<div>${n}</div>`).addClass("list-label");
    $(".list-3").append(item3);
  });

});

const floatFormat = (number, n) => {
  const pow = Math.pow(10, n);

  return Math.round(number * pow) / pow;
};

