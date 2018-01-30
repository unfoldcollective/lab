/*
 Copyright 2017 Keith Peters

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
 persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;


var scale = 0.01,
    speed = 0.03,
    max_scale = 10,
    count = 500,
    hue_shift = 50,
    hue = 0,
    saturation = 1,
    lightness = 0.5,
    bg_hue = 0,
    bg_saturation = 0.7,
    bg_lightness = 1,
    bg_transparent = false,
    z = 0;

document.getElementById("scale").min           = 0.001;
document.getElementById("scale").max           = 0.02;
document.getElementById("scale").step          = 0.001;
document.getElementById("scale").value         = scale;
function set_scale(value) { scale = parseFloat(value); }

document.getElementById("speed").min           = 0.0;
document.getElementById("speed").max           = 0.2;
document.getElementById("speed").step          = 0.01;
document.getElementById("speed").value         = speed;
function set_speed(value) { speed = parseFloat(value); }

document.getElementById("max_scale").min       = 0.25;
document.getElementById("max_scale").max       = 30.0;
document.getElementById("max_scale").step      = 0.01;
document.getElementById("max_scale").value     = max_scale;
function set_max_scale(value) { max_scale = parseFloat(value); }

document.getElementById("count").min           = 1.0,
document.getElementById("count").max           = 1000.0;
document.getElementById("count").step          = 1.0;
document.getElementById("count").value         = count;
function set_count(value) { count = parseFloat(value); }

document.getElementById("hue_shift").min             = 0.0;
document.getElementById("hue_shift").max             = 100.0;
document.getElementById("hue_shift").step            = 1.0;
document.getElementById("hue_shift").value           = hue_shift;
function set_hue_shift(value) { hue_shift = parseFloat(value); }

document.getElementById("hue").min             = 0.0;
document.getElementById("hue").max             = 360.0;
document.getElementById("hue").step            = 1.0;
document.getElementById("hue").value           = hue;
function set_hue(value) { hue = parseFloat(value); }

document.getElementById("saturation").min      = 0.0;
document.getElementById("saturation").max      = 1.0;
document.getElementById("saturation").step     = 0.01;
document.getElementById("saturation").value    = saturation;
function set_saturation(value) { saturation = parseFloat(value); }

document.getElementById("lightness").min       = 0.0;
document.getElementById("lightness").max       = 1.0;
document.getElementById("lightness").step      = 0.01;
document.getElementById("lightness").value     = lightness;
function set_lightness(value) { lightness = parseFloat(value); }

document.getElementById("bg_hue").min          = 0.0;
document.getElementById("bg_hue").max          = 360.0;
document.getElementById("bg_hue").step         = 1.0;
document.getElementById("bg_hue").value        = bg_hue;
function set_bg_hue(value) { bg_hue = parseFloat(value); }

document.getElementById("bg_saturation").min   = 0.0;
document.getElementById("bg_saturation").max   = 1.0;
document.getElementById("bg_saturation").step  = 0.01;
document.getElementById("bg_saturation").value = bg_saturation;
function set_bg_saturation(value) { bg_saturation = parseFloat(value); }

document.getElementById("bg_lightness").min    = 0.0;
document.getElementById("bg_lightness").max    = 1.0;
document.getElementById("bg_lightness").step   = 0.01;
document.getElementById("bg_lightness").value  = bg_lightness;
function set_bg_lightness(value) { bg_lightness = parseFloat(value); }


    // .addBoolean("transparent bg", bg_transparent, function(value) {
    //     bg_transparent = value;
    // })



bitlib.anim(update).start();

function update() {
    bitlib.random.seed(0);
    context.save();
    if (bg_transparent) {
        context.clear();
    }
    else {
        context.clear(bitlib.color.hsv(bg_hue, bg_saturation, bg_lightness));
    }    
    context.globalCompositeOperation = "lighten";

    

    for(var i = 0; i < count; i++) {
        draw();
    }

    context.restore();
    z += speed;

}

function draw() {
    var r = bitlib.random.float(0, height / 2 - 40),
        a = bitlib.random.float(Math.PI * 2),
        x = width / 2 + Math.cos(a) * r,
        y = height / 2 + Math.sin(a) * r,
        s   = bitlib.math.map(noise.perlin3(x * scale, y * scale, z), -1, 1, 0, max_scale);

    var gradient = context.createLinearGradient(0, -5, 0, 5);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(1, bitlib.color.hsv(hue + (s * hue_shift), saturation, lightness));
    context.fillStyle = gradient;

    context.save();
    context.translate(x, y);
    context.rotate(bitlib.random.float(-0.75, -0.25));
    context.scale(s, s);
    context.fillCircle(0, 0, 5);
    context.restore();

}