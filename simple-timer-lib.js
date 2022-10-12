function Simple_Timer(elementForPie, functionFinished, intervalDrowing, PieResetDrow, colorBigger, colorSmaller) {
    let ele4Pie= elementForPie,
        funcFinishedDef = functionFinished,
        funcFinished = funcFinishedDef;
        interval = intervalDrowing || 20,
        pieResetDrow = PieResetDrow || false,
        colorB = colorBigger,
        colorS = colorSmaller || 'rgba(0,0,0,0)',
        timeMil= -1,
        timeStr= 0,
        thisObj = this;

    this.start = function (secondMil, functionFinished) {
        console.log("Simple-Timer: start")
        funcFinished = functionFinished || funcFinishedDef;
        timeMil = secondMil;
        timeStr = new Date();
        this.tryDrow()
    }

    this.tryDrow = function () {
        if (thisObj.drow()) {
            setTimeout(thisObj.tryDrow, interval);
        } else {
            console.log("Simple-Timer: Finish")
        }
    }

    this.drow = function () {
        let spa = " "
        let timeNow = new Date();
        if (timeNow.getTime() - timeStr.getTime() < timeMil) {
            par = (((timeNow.getTime() - timeStr.getTime()) / timeMil) * 100);
            //console.log(par);
            ele4Pie.style.background =
                "conic-gradient(" + colorB + spa + par + "%," + 
                    spa + colorS  + spa + par + "%)";
            return true;
        }
        if (pieResetDrow) {
        ele4Pie.style.background =
            "conic-gradient(" + colorB + spa + "0%," + spa + colorS  + spa + "0%)";
        } else {
            ele4Pie.style.background =
            "conic-gradient(" + colorB + spa + "100%," + spa + colorS  + spa + "100%)";
        }
        timeMil = -1;
        setTimeout(funcFinished, 0);
        return false;
    }

    this.stop = function () {
        timeMil = -1;
    }

    this.setPieResetDrow = function (bool) {
        pieResetDrow = bool;
    }

    this.isDrowing = function () {
        if (timeMil === -1) {
            return false;
        }
        return true;
    }
}