// Carousel implementation
let items = document.querySelectorAll('.carousel .carousel-item')

items.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
            next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})



// Ticket buying implementation

function Seat() {
    width = '1.5rem';
    height = '1.5rem';
    border = '1px solid black';
    seatTaken = Math.floor(Math.random() * 2);
}

Seat.prototype.createSeat = function (price) {
    const newDiv = document.createElement('div');
    newDiv.style.width = width;
    newDiv.style.height = height;
    newDiv.style.border = border;
    newDiv.style.margin = '2px';

    if (seatTaken === 0) {
        newDiv.className = 'seat-map__item_green seatAvailable';
        newDiv.textContent = price;
    } else {
        newDiv.className = 'seat-map__item_red';
    }
    return newDiv;
}

document.getElementById('firstMovie').addEventListener('click', showSeats);
document.getElementById('secondMovie').addEventListener('click', showSeats);


function showSeats() {
    const allSeats = document.getElementById('allSeats');
    const table = document.createElement('table');
    // allSeats.appendChild(table);  
    const firstRowPrice = 1;
    const secondRowPrice = 3;
    const thirdRowPrice = 6;
    const fourthRowPrice = 8;

    if (allSeats.innerHTML === '') {
        allSeats.appendChild(table);
        for (let i = 0; i < 4; i++) {
            const tr = document.createElement('tr');
            table.appendChild(tr);
            for (let j = 0; j < 10; j++) {
                const seat = new Seat();
                // const newDiv = document.createElement('div');
                // newDiv.className = 'seat-map__item seat-map__item_green';
                // newDiv.style.margin = '2px';
                // allSeats.appendChild(newDiv);
                let price = '';
                if (i === 0) {
                    price = firstRowPrice;
                } else if (i === 1) {
                    price = secondRowPrice;
                } else if (i === 2) {
                    price = thirdRowPrice;
                } else {
                    price = fourthRowPrice;
                }

                const td = document.createElement('td');
                td.appendChild(seat.createSeat(price));

                tr.appendChild(td);
                // console.log(td.innerHTML);



                // allSeats.appendChild(seat.createSeat());
            }

        }
    }



    let availableSeats = document.querySelectorAll('.seatAvailable');
    // let selectedSeats = document.querySelectorAll('.seat-map__item_blue');

    availableSeats.forEach(function (element) {
        element.addEventListener('click', function (element) {
            // console.log(element.target.textContent);
            if (element.target.className === 'seat-map__item_green seatAvailable') {
                element.target.className = 'seat-map__item_blue';
                setPrice(element.target);
            } else {
                element.target.className = 'seat-map__item_green seatAvailable';
                setPrice(element.target);
            }
        });

    });



}

let count = 0;
const totalPrice = document.querySelector('.total-price-area__amount');
setPrice = function (target) {
    chosenSeatPrice = target.innerHTML;
    const seatPrice = document.querySelector('.price-area__amount');
    // console.log(seatPrice.textContent);
    seatPrice.textContent = `$ ${chosenSeatPrice}`;


    if (target.className === 'seat-map__item_blue') {
        count += parseInt(chosenSeatPrice);
    } else {
        count -= parseInt(chosenSeatPrice);
        seatPrice.textContent = '$ ';
    }

    totalPrice.textContent = `$ ${count}`;
}





const buyBtn = document.getElementById('buyBtn').addEventListener('click', buyTicket);

function buyTicket() {
    if (totalPrice.textContent <= '$ 0' || totalPrice.textContent === '$') {
        alert('Choose a ticket');
    } else {
        alert(`Total price is: ${totalPrice.textContent}
        Confirm Purchase By Clicking OK`);
    }
}