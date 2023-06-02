
/* Performance
   Detect perf of the computer
   ========================================================================== */

   export const Perf = () => {
    let array = [];
    let quality = "PERF_BAD";
    const start = (window.performance || Date).now();
    for (let i = 0; i < 20000; i++) {
      array = Math.pow(Math.sin(Math.random()), 2);
    }
  
    const end = (window.performance || Date).now();
    const perf = end - start;
  
    if (Sniffer.isIE || Sniffer.isEdge) {
      quality = "PERF_BAD";
    } else {
      if (perf < 7) quality = "PERF_HIGH";
      else if (perf < 14) quality = "PERF_GOOD";
      else if (perf < 22) quality = "PERF_LOW";
      else quality = "PERF_BAD";
    }
  
    return quality;
  };