document.addEventListener('DOMContentLoaded', function(event) {
    const body = document.body;

    const form = body.querySelector("form");
    const textarea = form["birthday-data"];
    const data = JSON.parse(textarea.innerHTML);
    console.log(data);

    const daysList = body.querySelector(".days__list");
    const daysLis = daysList.querySelectorAll(".days__list__item");

    const yearInput = form["year-input"];

    let days= [[],[],[],[],[],[],[]];

    let minYear = 1958;
    let year = 0;

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let yearInputValue = parseInt(yearInput.value);
        if(yearInputValue != "" && yearInputValue != null) {
            if(yearInputValue >= minYear) {
                year = yearInputValue;
                updateDays();
            }
        }
    });

    // separate full-date into day, month & year
    for(let i = 0; i < data.length; i++) {
        let name = data[i].name;
        let birthday = data[i].birthday;
        let date, month, year;
        date = parseInt(birthday.split("/")[0]);
        month = parseInt(birthday.split("/")[1]);
        year = parseInt(birthday.split("/")[2]);
        data[i] = {name, birthday, date, month, year};
    }
    console.log(data);

    function updateDays() {
        days= [[],[],[],[],[],[],[]];
        for(let i = 0; i < data.length; i++) {
            if(data[i].year <= year) {
                let nameInitials = data[i].name.split(" ")[0].charAt(0) + data[i].name.split(" ")[1].charAt(0);
                switch(getDay(data[i].date, data[i].month)) {
                    case 0: days[6].push(nameInitials);
                            break;
                    case 1: days[0].push(nameInitials);
                             break;
                    case 2: days[1].push(nameInitials);
                             break;
                    case 3: days[2].push(nameInitials);
                            break;
                    case 4: days[3].push(nameInitials);
                            break;
                    case 5: days[4].push(nameInitials);
                            break;
                    case 6: days[5].push(nameInitials);
                            break;
                }
            }
        }
        console.log(days);
        updateBirthdaysHTML();
    }

    function getDay(dateNum, month) {
        const date = new Date(`${month}/${dateNum}/${year}`);
        const day = date.getDay();
        return day;
    }

    function updateBirthdaysHTML() {
        for(let i = 0; i < days.length; i++) {
            let list = daysLis[i].querySelector(".birthdays__list");
            list.parentNode.removeChild(list);
            let ul = document.createElement("ul");
            ul.classList.add("birthdays__list");
            daysLis[i].append(ul);
            if(days[i].length > 0) {
                ul.classList.add(addStyleToBirthdays(days[i]));
                ul.classList.remove('day--empty');
                for(j = 0; j < days[i].length; j++) {
                    let li = document.createElement("li");
                    li.classList.add("birthdays__list__item");
                    li.innerText = days[i][j];
                    ul.append(li);
                }
            }
            else {
                ul.classList.add('day--empty');
            }
        }
    }

    function addStyleToBirthdays(dayBirthdays) {
        let length = dayBirthdays.length;
        if(length == 1) {
            return 'one';
        }
        else if(length <= 4) {
            return 'four';
        }
        else if(length <= 9) {
            return 'nine';
        }
        else if(length <= 16) {
            return 'sixteen';
        }
        else if(length <= 25) {
            return 'twenty-five';
        }
        else if(length <= 36) {
            return 'thirty-six';
        }
        else if(length <= 49) {
            return 'forty-nine';
        }
    }

});