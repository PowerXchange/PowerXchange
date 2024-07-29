document.addEventListener("DOMContentLoaded", () => {
    const offers = [
        {
            img: "solar-panel.jpg",
            type: "Solar",
            location: "Johannesburg",
            price: 2.00,
            seller: "John Doe",
            rating: "★★★★☆",
        },
        {
            img: "wind-turbine.jpg",
            type: "Wind",
            location: "Cape Town",
            price: 1.80,
            seller: "Jane Smith",
            rating: "★★★★★",
        },
        {
            img: "hydro-plant.jpg",
            type: "Hydro",
            location: "Durban",
            price: 2.20,
            seller: "Mike Johnson",
            rating: "★★★☆☆",
        },
        // Add more offers here...
    ];

    const offersPerPage = 3;
    let currentPage = 1;

    const filterForm = document.getElementById("filter-form");
    const offersGrid = document.querySelector(".offers-grid");
    const pagination = document.getElementById("pagination");

    function displayOffers(filteredOffers, page = 1) {
        offersGrid.innerHTML = "";
        const start = (page - 1) * offersPerPage;
        const end = start + offersPerPage;
        const paginatedOffers = filteredOffers.slice(start, end);

        paginatedOffers.forEach(offer => {
            const offerDiv = document.createElement("div");
            offerDiv.className = "offer";
            offerDiv.innerHTML = `
                <img src="${offer.img}" alt="${offer.type} Energy Offer">
                <div class="offer-details">
                    <h3>${offer.type} Energy Offer</h3>
                    <p><strong>Energy Type:</strong> ${offer.type}</p>
                    <p><strong>Location:</strong> ${offer.location}</p>
                    <p><strong>Price:</strong> R${offer.price}/kWh</p>
                    <p>Seller: ${offer.seller}</p>
                    <p>Rating: ${offer.rating}</p>
                    <a href="offer-details.html" class="view-details">View Details</a>
                </div>
            `;
            offersGrid.appendChild(offerDiv);
        });

        updatePagination(filteredOffers.length, page);
    }

    function updatePagination(totalOffers, page) {
        const totalPages = Math.ceil(totalOffers / offersPerPage);
        pagination.innerHTML = "";

        const prevPageLink = document.createElement("a");
        prevPageLink.href = "#";
        prevPageLink.className = "prev-page";
        prevPageLink.textContent = "Previous";
        prevPageLink.addEventListener("click", () => {
            if (page > 1) {
                displayOffers(getFilteredOffers(), page - 1);
            }
        });
        pagination.appendChild(prevPageLink);

        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement("a");
            pageLink.href = "#";
            pageLink.className = "page-number";
            pageLink.textContent = i;
            pageLink.addEventListener("click", () => displayOffers(getFilteredOffers(), i));
            pagination.appendChild(pageLink);
        }

        const nextPageLink = document.createElement("a");
        nextPageLink.href = "#";
        nextPageLink.className = "next-page";
        nextPageLink.textContent = "Next";
        nextPageLink.addEventListener("click", () => {
            if (page < totalPages) {
                displayOffers(getFilteredOffers(), page + 1);
            }
        });
        pagination.appendChild(nextPageLink);
    }

    function getFilteredOffers() {
        const energyType = document.getElementById("energy-type").value;
        const location = document.getElementById("location").value.toLowerCase();
        const maxPrice = parseFloat(document.getElementById("price-range").value);

        return offers.filter(offer => {
            return (energyType === "" || offer.type.toLowerCase() === energyType.toLowerCase()) &&
                (location === "" || offer.location.toLowerCase().includes(location)) &&
                offer.price <= maxPrice;
        });
    }

    filterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        displayOffers(getFilteredOffers(), 1);
    });

    // Initial display
    displayOffers(offers, 1);
});
