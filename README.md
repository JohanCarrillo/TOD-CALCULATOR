# TOD-CALCULATOR
This calculator was made as the final project of the javascript module in The 
Odin Project.

## How to use:
The calculator executes the inputs one by one, using the result of every previous
operation as the first number in the next operation. It doesn't care about the
symbol hierarchy, everything flows from left to right. For example, the operation
1 + 2 * 6 / 3 => [(1+2) * 6] / 3 = 6.

### The special keys:
**AC**: stands for All Clear, this button deletes all the input history in the calculator
**DEL**: stands for DELete, it deletes the last input
All the other key are the current numbers, operators and the floating decimal point.