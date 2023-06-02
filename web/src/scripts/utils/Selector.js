/* QuerySelectorAll 
   QuerySelector
   GetElementByID
   ========================================================================== */

   export const qs = (s, o = document) => o.querySelector(s);
   export const qsa = (s, o = document) => afrom(o.querySelectorAll(s));
   export const afrom = (o) => Array.prototype.slice.call(o, 0);
   export const getid = (s, o = document) => o.getElementById(s);
   export const gettag = (s, o = document) => o.getElementsByTagName(s);
   


  
