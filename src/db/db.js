import falafelImg from "../images/menu/falafel/falafel.png"

import smallFriesImg from "../images/menu/fries/fries_small.png"
import bigFriesImg from "../images/menu/fries/fries_big.png"
import baguetteImg from "../images/menu/baguette/baguette.png"
import sabichImg from "../images/menu/sabich/sabich.png"

import cocaImg from "../images/menu/coca/coca.png"
import fantaImg from "../images/menu/fanta/fanta.png"
import waterImg from "../images/menu/water/water.png"

import tomatoes from "../images/menu/toppings/tomatoes.png"
import pickled_cucumbers from "../images/menu/toppings/pickled_cucumbers.png"
import humus from "../images/menu/toppings/humus.png"
import tahini from "../images/menu/toppings/tahini.png"
import spicy_sauce from "../images/menu/toppings/spicy_sauce.png"
import egg from "../images/menu/toppings/egg.png"
import hacilim from "../images/menu/toppings/hacilim.png"

export function getData() {
  return [
    {
      id: 1,
      title: "Falafel",
      price: 15,
      image: falafelImg,
      description:
        "Falafel is a deep-fried ball or patty made from ground chickpeas, fava beans, or both.",
      toppings: [
        { title: "tomatoes", cost: 0, image: tomatoes, count: 0 },
        {
          title: "pickled_cucumbers",
          cost: 0,
          image: pickled_cucumbers,
          count: 0,
        },
        { title: "humus", cost: 0, image: humus, count: 0 },
        { title: "tahini", cost: 0, image: tahini, count: 0 },
        { title: "spicy_sauce", cost: 0, image: spicy_sauce, count: 0 },
        { title: "egg", cost: 3, count: 0, image: egg },
        { title: "hacilim", cost: 3, count: 0, image: hacilim },
      ],
    },

    { id: 2, title: "Coca", price: 8, image: cocaImg },
    { id: 3, title: "Fanta", price: 8, image: fantaImg },
    { id: 4, title: "Water", price: 8, image: waterImg },

    {
      id: 9,
      title: "Small Fries",
      price: 8,
      image: smallFriesImg,
    },
    {
      id: 10,
      title: "Large Fries",
      price: 12,
      image: bigFriesImg,
    },
    {
      id: 11,
      title: "Tuna Baguette",
      price: 25,
      image: baguetteImg,
    },
    {
      id: 12,
      title: "Sabich",
      price: 18,
      image: sabichImg,
    },
    {
      id: 13,
      title: "Falafel in Baguette",
      price: 25,
      image: baguetteImg,
    },
  ]
}
