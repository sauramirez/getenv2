# Code Quality Report  
Mon Aug 21 2017 14:35:48 GMT-0500 (CDT)  
  
## Tests
    
**Getenv**  
✔ 1) should return the default (12 ms)  
✔ 2) should return boolean from the environment (0 ms)  
✔ 3) should return the default even with no validation (1 ms)  
✔ 4) should throw if no value undefined (2 ms)  
✔ 5) should use the default with no validation (0 ms)  
✔ 6) should use the default fallback with no validation (1 ms)  
✔ 7) should throw if no validation and no default (1 ms)  
✔ 8) should parse array from environment (2 ms)  
✔ 9) should default on envarray (0 ms)  
✔ 10) should parse object from environment (0 ms)  
✔ 11) should use default on envobject (1 ms)  
✔ 12) should use the fallback (0 ms)  
✔ 13) should fail if no fallback (1 ms)  
✔ 14) should test validation (2 ms)  
  
  
14 tests  
0 tests failed  
0 tests skipped  
  
Test duration: 33 ms  
  
  
## Leaks  
No global variable leaks detected  
  
  
## Coverage  
Threshold: 0%  
Coverage: 98.72% (1/78)  
  
  
## Linting  
Warnings threshold: 0  
Errors threshold: 0  
No issues  
  