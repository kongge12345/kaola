!(function() {
    var intDiff = parseInt(600000); //倒计时总秒数量

    function timer(intDiff) {
        setInterval(function() {
        var day = 0,
          hour = 0,
          minute = 0,
          second = 0; //时间默认值

        if (intDiff > 0) {
          day = Math.floor(intDiff / (60 * 60 * 24));

          var day1=parseInt(day/10);
          var day2=day%(day1*10);

          hour = Math.floor(intDiff / (60 * 60)) - day * 24;
          var hour1=parseInt(hour/10);
          var hour2=day%(hour1*10);

          minute = Math.floor(intDiff / 60) - day * 24 * 60 - hour * 60;
          var minute1=parseInt(minute/10);
          var minute2=day%(minute1*10);

          second =
            Math.floor(intDiff) -
            day * 24 * 60 * 60 -
            hour * 60 * 60 -
            minute * 60;
            var second1=parseInt(second/10);
            var second2=day%(second1*10);
        }

        if (minute <= 9) minute = "0" + minute;

        if (second <= 9) second = "0" + second;

        $("#hour1").html(hour1);
        $("#hour2").html(hour2);

        $("#minute1").html(minute1);
        $("#minute2").html(minute2);

        $("#second1").html(second1);
        $("#second2").html(second2);

        intDiff--;
      }, 1000);
    }

    $(function() {
      timer(intDiff);
    });
  })();
