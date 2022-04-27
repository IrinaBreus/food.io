function timer() {
    let days = document.querySelector('#days'),
        hours = document.querySelector('#hours'),
        minutes = document.querySelector('#minutes'),
        seconds = document.querySelector('#seconds');

    let now = new Date();
    let deadline = new Date(now.getFullYear(), now.getMonth(), (now.getDate() + 2));
    
    setClock();

    function getDate() {
        let time = deadline - (new Date()),
            day = Math.floor(time / (1000 * 60 * 60 * 24)),
            hour = Math.floor((time / (1000 * 60 * 60)) % 24),
            minute = Math.floor((time / (1000 * 60)) % 60),
            second = Math.floor(time / 1000 % 60);
        
        return {time, day, hour, minute, second};
    }

    let timerId = setInterval(setClock, 1000);

    function setClock() {
        let t = getDate();
        days.innerHTML = normalise(t.day);
        hours.innerHTML = normalise(t.hour);
        minutes.innerHTML = normalise(t.minute);
        seconds.innerHTML = normalise(t.second);

        if (t.time <= 0) {
            clearInterval(timerId);
        }
    }

    function normalise(num) {
        return num >= 0 && num < 10 ? `0${num}`: num;
    }
}

export default timer;