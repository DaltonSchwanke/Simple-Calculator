let isInsideFunction = false; 

/**
* Set div drag function when the page loads.
*/
document.addEventListener('DOMContentLoaded', function () {
  dragElement(document.getElementById("mydiv"));
});


/**
 *  The function below is used to select and drag the calculator 
 *  around the page.
 * 
 * @param {*} elmnt element to drag
 */
function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/**
* Clears the values stored in the 'result' div resetting the 
* expression.
*/
function clearInput(event) {
  if (event) {
    event.preventDefault();
  }
  console.log("Ran Clear");
  document.getElementById("result").value = "";
  isInsideFunction = false;
}

/**
* The dis function places the character in the results div on the page when the 
* user clicks on one of corresponding button on the page.
*/
function dis(value) {
  event.preventDefault();
  console.log("Ran Dis");
  const resultField = document.getElementById("result");

  // Handle function buttons
  if (value === "sine" || value === "cosine" || value === "tangent") {
    if (!isInsideFunction) {
      resultField.value += `${value}(`;
      isInsideFunction = true;
    }
  } else if (isInsideFunction && /[+\-x÷]/.test(value)) {
    resultField.value += `)${value}`;
    isInsideFunction = false; 
  } else if (isInsideFunction && !/[+\-x÷=]/.test(value)) {
    resultField.value += value;
  } else {
    resultField.value += value;
  }
}



/**
* solve is the function that is ran when the user clicks on the '=' button
* it will get the value in 'result' as the expression and then replace the 
* operators before called the Math.js function 'evaluate' that will solve the
* expression and set the value of 'result' to the value that is returned. 
*/
function solve() {
  event.preventDefault();
  console.log("Ran Solve");
  let x = document.getElementById("result").value;

  // Replace displayed operators with valid Math.js operators
  x = x.replace(/x/g, '*');
  x = x.replace(/÷/g, '/');

  // Replace sine, cosine, tangent with Math.js equivalents
  x = x.replace(/sine\(/g, 'sin(');
  x = x.replace(/cosine\(/g, 'cos(');
  x = x.replace(/tangent\(/g, 'tan(');

  try {
    let y = math.evaluate(x);
    document.getElementById("result").value = y;
  } catch (error) {
    document.getElementById("result").value = "Error";
  }
}
