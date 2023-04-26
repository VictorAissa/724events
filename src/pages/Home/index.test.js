import { fireEvent, render, screen } from "@testing-library/react";
// import { api, DataProvider } from "../../contexts/DataContext";
import Page from "./index";

// const data = {
//     events: [
//         {
//             id: 1,
//             type: "soirée entreprise",
//             date: "2022-04-29T20:28:45.744Z",
//             title: "Conférence #productCON",
//             cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
//             description:
//                 "Présentation des outils analytics aux professionnels du secteur",
//             nb_guesses: 1300,
//             periode: "24-25-26 Février",
//             prestations: [
//                 "1 espace d’exposition",
//                 "1 scéne principale",
//                 "2 espaces de restaurations",
//                 "1 site web dédié",
//             ],
//         },

//         {
//             id: 2,
//             type: "forum",
//             date: "2022-04-29T20:28:45.744Z",
//             title: "Forum #productCON",
//             cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
//             description:
//                 "Présentation des outils analytics aux professionnels du secteur",
//             nb_guesses: 1300,
//             periode: "24-25-26 Février",
//             prestations: ["1 espace d’exposition", "1 scéne principale"],
//         },
//     ],
// };

describe("When Form is created", () => {
    it("a list of fields card is displayed", async () => {
        render(<Page />);
        await screen.findByText("Email");
        await screen.findByText("Nom");
        await screen.findByText("Prénom");
        await screen.findByText("Personel / Entreprise");
    });

    describe("and a click is triggered on the submit button", () => {
        it("the success message is displayed", async () => {
            render(<Page />);
            fireEvent(
                await screen.findByText("Envoyer"),
                new MouseEvent("click", {
                    cancelable: true,
                    bubbles: true,
                })
            );
            await screen.findByText("En cours");
            await screen.findByText("Message envoyé !");
        });
    });
});

describe("When a page is created", () => {
    it("a list of events is displayed", async () => {
        render(<Page />);
        const eventCards = await screen.getAllByTestId("card-testid");
        const largeEventCards = eventCards.filter(
            (card) => !card.classList.contains("EventCard--small")
        );
        expect(largeEventCards.length).toBe(9);
    });
    it("a list a people is displayed", async () => {
        render(<Page />);
        const peopleCards = await screen.getAllByTestId("people-card-testid");
        expect(peopleCards.length).toBe(6);
    });
    it("a footer is displayed", async () => {
        render(<Page />);
        await screen.getByText("Notre dernière prestation");
        await screen.getByText("Contactez-nous");
    });
    it("an event card, with the last event, is displayed", async () => {
        render(<Page />);
        const eventCards = await screen.getAllByTestId("card-testid");
        const smallEventCard = eventCards.filter((card) =>
            card.classList.contains("EventCard--small")
        );
        expect(smallEventCard.length).toBe(1);
    });
});
