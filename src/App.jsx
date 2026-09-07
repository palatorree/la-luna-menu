import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Globe,
  Flame,
  Award,
  Tag,
  X,
  ChevronRight,
  ChevronLeft,
  Wine,
  UtensilsCrossed,
  Beef,
  Fish,
  Baby,
  Cake,
  Sun,
  Soup,
  Salad,
  Martini,
  Beer,
  GlassWater,
  CupSoda,
  Grape
} from 'lucide-react';

// ============================================================================
// BASE DE DATOS COMPLETA - LA LUNA KITCHEN & BAR
// ============================================================================
const BEVERAGE_SUBCATEGORIES = [
  { id: "sin-alcohol", name: { es: "Sin Alcohol", en: "Non-Alcoholic" }, icon: CupSoda },
  { id: "jugos-aguas", name: { es: "Jugos y Aguas", en: "Juices & Water" }, icon: GlassWater },
  { id: "cocteles", name: { es: "Cócteles", en: "Cocktails" }, icon: Martini },
  { id: "shots-rondas", name: { es: "Shots / Rondas", en: "Shots / Rounds" }, icon: Martini },
  { id: "cervezas", name: { es: "Cervezas", en: "Beers" }, icon: Beer },
  { id: "preparadas-cubetas", name: { es: "Preparadas, Caguamas y Cubetas", en: "Mixed Beers, Caguamas & Buckets" }, icon: Beer },
  { id: "tequila", name: { es: "Tequila", en: "Tequila" }, icon: Wine },
  { id: "whisky-vino", name: { es: "Whisky & Vino", en: "Whisky & Wine" }, icon: Grape }
];

const MENU_DATA = {
  restaurant: {
    name: "LA LUNA",
    subtitle: "KITCHEN & BAR",
    slogan: {
      es: "Menú Digital General",
      en: "General Digital Menu"
    }
  },
  categories: [
    { id: "desayunos", label: { es: "Desayunos", en: "Breakfast" }, icon: Sun },
    { id: "entradas", label: { es: "Entradas", en: "Appetizers" }, icon: UtensilsCrossed },
    { id: "cortes", label: { es: "Cortes & Parrilla", en: "Steaks & Grill" }, icon: Beef },
    { id: "mariscos-frios", label: { es: "Mariscos Barra Fría", en: "Cold Seafood Bar" }, icon: Fish },
    { id: "mariscos-calientes", label: { es: "Mariscos Barra Caliente", en: "Hot Seafood Bar" }, icon: Soup },
    { id: "antojitos", label: { es: "Tacos & Antojitos", en: "Tacos & Mexican Favs" }, icon: UtensilsCrossed },
    { id: "burgers-wings", label: { es: "Hamburguesas & Wings", en: "Burgers & Wings" }, icon: UtensilsCrossed },
    { id: "kids", label: { es: "Menú Kids", en: "Kids Menu" }, icon: Baby },
    { id: "bebidas", label: { es: "Bebidas & Bar", en: "Drinks & Bar" }, icon: Wine },
    { id: "postres", label: { es: "Postres", en: "Desserts" }, icon: Cake },
    { id: "extras", label: { es: "Extras & Guarniciones", en: "Extras & Sides" }, icon: Salad }

  ],

  items: [
    // --- 1. DESAYUNOS ---
    { id: "des-1", categoryId: "desayunos", name: { es: "Chilaquiles Verdes o Rojos Naturales", en: "Natural Red or Green Chilaquiles" }, description: { es: "Salsa roja o verde, crema y queso.", en: "Red or green salsa, cream and cheese." }, price: 16.99, image: "", tags: ["popular"], spicyLevel: 1 },
    { id: "des-2", categoryId: "desayunos", name: { es: "Chilaquiles con Proteína (Asada, Chorizo, Pollo o Huevo)", en: "Chilaquiles with Protein (Steak, Chorizo, Chicken or Egg)" }, description: { es: "Acompañados de tu proteína a elegir, crema y queso.", en: "Topped with your choice of protein, cream and cheese." }, price: 22.00, image: "/images/chilaquiles.jpeg", tags: [], spicyLevel: 1 },
    { id: "des-3", categoryId: "desayunos", name: { es: "Chilaquiles con Arrachera", en: "Skirt Steak Chilaquiles" }, description: { es: "Servidos con jugosa carne de arrachera, crema y queso.", en: "Served with juicy skirt steak, cream and cheese." }, price: 30.00, image: "", tags: ["chef"], spicyLevel: 1 },
    { id: "des-4", categoryId: "desayunos", name: { es: "Enchiladas Rojas y Verdes Naturales de Queso", en: "Cheese Red & Green Enchiladas" }, description: { es: "Rellenas de queso fresco.", en: "Stuffed with fresh cheese." }, price: 16.99, image: "", tags: [], spicyLevel: 1 },
    { id: "des-5", categoryId: "desayunos", name: { es: "Enchiladas de Pollo", en: "Chicken Enchiladas" }, description: { es: "Con lechuga, cilantro, crema, queso y cebolla en medias lunas.", en: "Topped with lettuce, cilantro, cream, cheese and sliced onions." }, price: 22.00, image: "", tags: ["popular"], spicyLevel: 1 },
    { id: "des-6", categoryId: "desayunos", name: { es: "Huevos Estrellados", en: "Fried Eggs" }, description: { es: "Dos huevos fritos al gusto.", en: "Two eggs cooked to order." }, price: 16.00, image: "", tags: [], spicyLevel: 0 },
    { id: "des-7", categoryId: "desayunos", name: { es: "Huevos a la Mexicana", en: "Mexican Style Eggs" }, description: { es: "Cebolla, tomate y chile jalapeño.", en: "Scrambled with onion, tomato and jalapeño pepper." }, price: 16.00, image: "", tags: [], spicyLevel: 1 },
    { id: "des-8", categoryId: "desayunos", name: { es: "Huevos con Jamón, Chorizo, Tocino o Salchicha", en: "Eggs with Ham, Chorizo, Bacon or Sausage" }, description: { es: "Acompañados de tu proteína favorita.", en: "Scrambled with your favorite protein." }, price: 20.00, image: "", tags: [], spicyLevel: 0 },
    { id: "des-9", categoryId: "desayunos", name: { es: "Huevos con Machaca", en: "Shredded Beef with Eggs (Machaca)" }, description: { es: "Carne deshebrada con tomate, cebolla y jalapeño.", en: "Shredded dried beef scrambled with tomato, onion and jalapeño." }, price: 22.00, image: "", tags: ["popular"], spicyLevel: 1 },
    { id: "des-10", categoryId: "desayunos", name: { es: "Huevos Rancheros", en: "Huevos Rancheros" }, description: { es: "Servidos sobre tortilla con salsa verde y salsa roja.", en: "Served over tortillas with red and green salsa." }, price: 20.00, image: "", tags: [], spicyLevel: 1 },
    { id: "des-11", categoryId: "desayunos", name: { es: "Desayuno Americano", en: "American Breakfast Combo" }, description: { es: "2 huevos al gusto, tocino, hash browns y pancakes o pan tostado.", en: "2 eggs any style, bacon, hash browns and pancakes or toast." }, price: 19.99, image: "", tags: ["chef"], spicyLevel: 0 },
    { id: "des-12", categoryId: "desayunos", name: { es: "Omelette Vegetariano", en: "Veggie Omelette" }, description: { es: "Tomate, cebolla, jalapeño o en salsa roja/verde.", en: "Tomato, onion, jalapeño or topped with red/green salsa." }, price: 16.99, image: "", tags: [], spicyLevel: 0 },
    { id: "des-13", categoryId: "desayunos", name: { es: "Omelette de Champiñones o Espinacas", en: "Mushroom or Spinach Omelette" }, description: { es: "Relleno de champiñones frescos o espinacas.", en: "Stuffed with fresh mushrooms or spinach." }, price: 21.99, image: "", tags: [], spicyLevel: 0 },
    { id: "des-14", categoryId: "desayunos", name: { es: "Omelette de Carnes (Jamón, Chorizo, Salchicha o Tocino)", en: "Meat Lover's Omelette" }, description: { es: "Relleno con tu carne fría favorita.", en: "Stuffed with your favorite breakfast meat." }, price: 21.99, image: "", tags: [], spicyLevel: 0 },
    { id: "des-15", categoryId: "desayunos", name: { es: "Breakfast Burrito (Jamón, Chorizo, Salchicha, Pollo o Asada)", en: "Breakfast Burrito (Ham, Chorizo, Sausage, Chicken or Steak)" }, description: { es: "En tortilla de harina grande con tu proteína favorita.", en: "Wrapped in a large flour tortilla with your choice of protein." }, price: 16.99, image: "/images/burrito.jpeg", tags: ["popular"], spicyLevel: 0 },
    { id: "des-16", categoryId: "desayunos", name: { es: "Breakfast Burrito de Machaca", en: "Machaca Breakfast Burrito" }, description: { es: "Tomate, cebolla y jalapeño.", en: "Shredded beef cooked with tomato, onion and jalapeño." }, price: 22.00, image: "", tags: [], spicyLevel: 1 },
    { id: "des-17", categoryId: "desayunos", name: { es: "Breakfast Burrito (Chile Colorado o Chile Verde)", en: "Breakfast Burrito (Red or Green Chile)" }, description: { es: "Relleno de carne en salsa de chile colorado o verde.", en: "Filled with meat simmered in red or green chile sauce." }, price: 16.99, image: "", tags: [], spicyLevel: 1 },
    { id: "des-18", categoryId: "desayunos", name: { es: "Breakfast Quesadilla (Jamón, Chorizo, Salchicha, Pollo o Asada)", en: "Breakfast Quesadilla (Ham, Chorizo, Sausage, Chicken or Steak)" }, description: { es: "Queso derretido con tu proteína a elegir.", en: "Melted cheese quesadilla with your choice of protein." }, price: 20.00, image: "", tags: [], spicyLevel: 0 },
    { id: "des-19", categoryId: "desayunos", name: { es: "Breakfast Quesadilla de Champiñones o Espinacas", en: "Mushroom or Spinach Breakfast Quesadilla" }, description: { es: "Queso derretido con champiñones o espinacas.", en: "Melted cheese quesadilla with fresh mushrooms or spinach." }, price: 21.99, image: "", tags: [], spicyLevel: 0 },
    { id: "des-20", categoryId: "desayunos", name: { es: "Sandwich Especial de Desayuno", en: "Special Breakfast Sandwich" }, description: { es: "Tocino, huevo, jamón, lechuga, cebolla y tomate.", en: "Bacon, egg, ham, lettuce, onion and tomato." }, price: 18.99, image: "/images/sandwich.jpeg", tags: [], spicyLevel: 0 },
    { id: "des-21", categoryId: "desayunos", name: { es: "Pancakes Naturales", en: "Classic Pancakes" }, description: { es: "Esponjosos hotcakes tradicionales.", en: "Fluffy traditional pancakes." }, price: 12.00, image: "", tags: [], spicyLevel: 0 },
    { id: "des-22", categoryId: "desayunos", name: { es: "Gorditas de Queso (Orden de 3)", en: "Cheese Gorditas (Order of 3)" }, description: { es: "Masa de maíz con jalapeño y queso.", en: "Thick corn tortillas stuffed with cheese and jalapeño." }, price: 21.00, image: "", tags: ["chef"], spicyLevel: 1 },

    // --- ENTRADAS ---
    { id: "ent-1", categoryId: "entradas", name: { es: "Guacamole Individual", en: "Single Guacamole" }, description: { es: "Guacamole fresco de la casa.", en: "Fresh house guacamole." }, price: 4.00, image: "", tags: [], spicyLevel: 0 },
    { id: "ent-2", categoryId: "entradas", name: { es: "Guacamole Familiar", en: "Family Guacamole" }, description: { es: "Guacamole fresco tamaño familiar.", en: "Fresh family size guacamole." }, price: 12.00, image: "", tags: ["popular"], spicyLevel: 0 },
    { id: "ent-3", categoryId: "entradas", name: { es: "Cheese Dip", en: "Cheese Dip" }, description: { es: "Dip de queso derretido.", en: "Melted cheese dip." }, price: 6.00, image: "", tags: [], spicyLevel: 0 },
    { id: "ent-4", categoryId: "entradas", name: { es: "Gorditas de Queso (Orden de 3)", en: "Cheese Gorditas (Order of 3)" }, description: { es: "Maíz con jalapeño y queso.", en: "Corn with jalapeño and cheese." }, price: 21.00, image: "", tags: [], spicyLevel: 1 },
    { id: "ent-5", categoryId: "entradas", name: { es: "Carne Seca en Botana", en: "Beef Jerky Snack" }, description: { es: "Con pepino, Tostitos y cacahuates.", en: "With cucumber, Tostitos and peanuts." }, price: 15.00, image: "/images/carneseca.jpeg", tags: [], spicyLevel: 0 },
    { id: "ent-6", categoryId: "entradas", name: { es: "Tuna", en: "Tuna" }, description: { es: "Botana de atún fresco.", en: "Fresh tuna snack." }, price: 29.99, image: "", tags: ["chef"], spicyLevel: 0 },
    { id: "ent-7", categoryId: "entradas", name: { es: "Jalapeños", en: "Jalapeños" }, description: { es: "6 chiles jalapeños con tocino y queso.", en: "6 jalapeño peppers with bacon and cheese." }, price: 19.99, image: "", tags: [], spicyLevel: 2 },
    { id: "ent-8", categoryId: "entradas", name: { es: "Camarones al Vapor", en: "Steamed Shrimp" }, description: { es: "Camarones al vapor estilo botana.", en: "Steamed shrimp snack style." }, price: 29.99, image: "", tags: [], spicyLevel: 0 },

    // --- MARISCOS BARRA CALIENTE ---
    { id: "mcal-1", categoryId: "mariscos-calientes", name: { es: "Camarones Rancheros", en: "Ranchero Shrimp" }, description: { es: "Acompañados de arroz y ensalada.", en: "Served with rice and salad." }, price: 29.99, image: "", tags: [], spicyLevel: 1 },
    { id: "mcal-2", categoryId: "mariscos-calientes", name: { es: "Camarones a la Diabla", en: "Diabla Shrimp" }, description: { es: "Acompañados de arroz y ensalada.", en: "Served with rice and salad." }, price: 29.99, image: "/images/cdiabla.jpeg", tags: [], spicyLevel: 3 },
    { id: "mcal-3", categoryId: "mariscos-calientes", name: { es: "Camarones a la Cucaracha", en: "Cucaracha Shrimp" }, description: { es: "Acompañados de arroz y ensalada.", en: "Served with rice and salad." }, price: 29.99, image: "", tags: ["popular"], spicyLevel: 1 },
    { id: "mcal-4", categoryId: "mariscos-calientes", name: { es: "Camarones a la Mantequilla", en: "Butter Shrimp" }, description: { es: "Acompañados de arroz y ensalada.", en: "Served with rice and salad." }, price: 29.99, image: "", tags: [], spicyLevel: 0 },
    { id: "mcal-5", categoryId: "mariscos-calientes", name: { es: "Camarones al Mojo de Ajo", en: "Garlic Butter Shrimp" }, description: { es: "Acompañados de arroz y ensalada.", en: "Served with rice and salad." }, price: 29.99, image: "", tags: [], spicyLevel: 0 },
    { id: "mcal-6", categoryId: "mariscos-calientes", name: { es: "Camarones a la Momia", en: "Mummy Shrimp" }, description: { es: "Camarones rellenos envueltos en tocino. Acompañados de arroz y ensalada.", en: "Stuffed shrimp wrapped in bacon. Served with rice and salad." }, price: 29.99, image: "/images/camaronestoc.jpeg", tags: ["chef"], spicyLevel: 0 },
    { id: "mcal-7", categoryId: "mariscos-calientes", name: { es: "Camarones a la Crema", en: "Creamy Shrimp" }, description: { es: "Chile pimiento, cebolla, tomate, cilantro y crema. Acompañados de arroz y ensalada.", en: "Bell pepper, onion, tomato, cilantro and cream. Served with rice and salad." }, price: 29.99, image: "", tags: [], spicyLevel: 0 },
    { id: "mcal-8", categoryId: "mariscos-calientes", name: { es: "Camarones Empanizados", en: "Breaded Shrimp" }, description: { es: "Acompañados de arroz y ensalada.", en: "Served with rice and salad." }, price: 29.99, image: "images/cempanizados.jpeg", tags: [], spicyLevel: 0 },
    { id: "mcal-9", categoryId: "mariscos-calientes", name: { es: "Caldo de Camarón", en: "Shrimp Soup" }, description: { es: "Caldo tradicional de camarón.", en: "Traditional shrimp soup." }, price: 29.99, image: "/images/jcamaron.jpeg", tags: [], spicyLevel: 0 },
    { id: "mcal-10", categoryId: "mariscos-calientes", name: { es: "Caldo de Camarón y Pulpo", en: "Shrimp and Octopus Soup" }, description: { es: "Caldo combinado de camarón y pulpo.", en: "Combined shrimp and octopus soup." }, price: 35.00, image: "", tags: [], spicyLevel: 0 },
    { id: "mcal-11", categoryId: "mariscos-calientes", name: { es: "Camarones Estilo Louisiana (4 personas)", en: "Louisiana Style Shrimp (Serves 4)" }, description: { es: "Estilo Louisiana ideal para compartir.", en: "Louisiana style perfect for sharing." }, price: 120.00, image: "", tags: ["chef"], spicyLevel: 2 },
    { id: "mcal-12", categoryId: "mariscos-calientes", name: { es: "Mojarra Frita", en: "Fried Mojarra" }, description: { es: "Acompañada de arroz y ensalada.", en: "Served with rice and salad." }, price: 27.00, image: "", tags: [], spicyLevel: 0 },
    // --- MARISCOS BARRA FRÍA ---
    { id: "agu-1", categoryId: "mariscos-frios", name: { es: "Aguachiles Verdes", en: "Green Aguachiles" }, description: { es: "Curtidos en limón o cocidos.", en: "Lime-cured or cooked." }, price: 29.99, image: "", tags: [], spicyLevel: 2 },
    { id: "agu-2", categoryId: "mariscos-frios", name: { es: "Aguachiles Rojos", en: "Red Aguachiles" }, description: { es: "Curtidos en limón o cocidos.", en: "Lime-cured or cooked." }, price: 29.99, image: "/images/arojo.jpeg", tags: [], spicyLevel: 2 },
    { id: "agu-3", categoryId: "mariscos-frios", name: { es: "Aguachiles Piquín", en: "Piquin Aguachiles" }, description: { es: "Curtidos en limón o cocidos con chile piquín.", en: "Lime-cured or cooked with piquin pepper." }, price: 29.99, image: "images/ceviche2.jpeg", tags: [], spicyLevel: 3 },
    { id: "agu-4", categoryId: "mariscos-frios", name: { es: "Aguachiles Negros", en: "Black Aguachiles" }, description: { es: "Salsa negra de la casa. Curtidos en limón o cocidos.", en: "House black sauce. Lime-cured or cooked." }, price: 29.99, image: "/images/aguachilenegro.jpeg", tags: ["popular"], spicyLevel: 2 },
    { id: "agu-5", categoryId: "mariscos-frios", name: { es: "Aguachiles al Guacamole", en: "Guacamole Aguachiles" }, description: { es: "Curtidos en limón o cocidos con crema de guacamole.", en: "Lime-cured or cooked with guacamole cream." }, price: 29.99, image: "", tags: [], spicyLevel: 1 },
    { id: "agu-6", categoryId: "mariscos-frios", name: { es: "Aguachiles Mango Habanero", en: "Mango Habanero Aguachiles" }, description: { es: "Curtidos en limón o cocidos con salsa de mango habanero.", en: "Lime-cured or cooked with mango habanero sauce." }, price: 29.99, image: "", tags: [], spicyLevel: 3 },
    { id: "agu-7", categoryId: "mariscos-frios", name: { es: "Charola Botanera de Aguachiles y Ceviches", en: "Aguachiles & Ceviches Snack Tray" }, description: { es: "Variedad de hasta 5 sabores.", en: "Variety of up to 5 flavors." }, price: 80.00, image: "", tags: ["chef"], spicyLevel: 2 },
    { id: "agu-8", categoryId: "mariscos-frios", name: { es: "Pecado en La Luna", en: "Pecado en La Luna" }, description: { es: "Especialidad de la casa.", en: "House specialty." }, price: 54.00, image: "", tags: ["chef"], spicyLevel: 2 },
    { id: "agu-9", categoryId: "mariscos-frios", name: { es: "Torre Sencilla de Camarón", en: "Simple Shrimp Tower" }, description: { es: "Torre de camarón fresco estilo barra fría.", en: "Fresh cold bar shrimp tower." }, price: 35.00, image: "", tags: [], spicyLevel: 1 },
    { id: "agu-10", categoryId: "mariscos-frios", name: { es: "Torre Luna", en: "Luna Tower" }, description: { es: "Callo de hacha, pulpo, camarón cocido/curtido, ceviche de camarón y pescado.", en: "Scallops, octopus, cooked/cured shrimp, shrimp & fish ceviche." }, price: 55.00, image: "", tags: ["chef", "popular"], spicyLevel: 1 },
    { id: "agu-11", categoryId: "mariscos-frios", name: { es: "Aguachile 3 Salsas", en: "3 Sauces Aguachile" }, description: { es: "Combinación de salsa roja, verde y negra.", en: "Combination of red, green, and black sauce." }, price: 38.00, image: "", tags: [], spicyLevel: 2 },
    { id: "agu-12", categoryId: "mariscos-frios", name: { es: "Aguachile Mixto con Ceviche", en: "Mixed Aguachile with Ceviche" }, description: { es: "Combinación de aguachile y ceviche.", en: "Combination of aguachile and ceviche." }, price: 38.00, image: "", tags: [], spicyLevel: 2 },
    { id: "cev-1", categoryId: "mariscos-frios", name: { es: "Ceviche de Camarón Cocido", en: "Cooked Shrimp Ceviche" }, description: { es: "Camarón cocido con verdura fresca y limón.", en: "Cooked shrimp with fresh vegetables and lime." }, price: 29.99, image: "", tags: [], spicyLevel: 0 },
    { id: "cev-2", categoryId: "mariscos-frios", name: { es: "Ceviche de Camarón Curtido", en: "Lime-Cured Shrimp Ceviche" }, description: { es: "Camarón curtido en limón con verdura fresca.", en: "Lime-cured shrimp with fresh vegetables." }, price: 29.99, image: "", tags: [], spicyLevel: 1 },
    { id: "cev-3", categoryId: "mariscos-frios", name: { es: "Ceviche de Pescado", en: "Fish Ceviche" }, description: { es: "Pescado fresco curtido en limón.", en: "Fresh fish cured in lime." }, price: 29.99, image: "", tags: [], spicyLevel: 0 },
    { id: "cev-4", categoryId: "mariscos-frios", name: { es: "Ceviche de Mango", en: "Mango Ceviche" }, description: { es: "Ceviche preparado con toque de mango fresco.", en: "Ceviche prepared with a touch of fresh mango." }, price: 29.99, image: "images/cevichemango.jpeg", tags: [], spicyLevel: 1 },
    { id: "cev-5", categoryId: "mariscos-frios", name: { es: "Ceviche de Camarón con Pulpo", en: "Shrimp and Octopus Ceviche" }, description: { es: "Mezcla de camarón y pulpo picado.", en: "Mix of diced shrimp and octopus." }, price: 35.00, image: "images/cpulpo.jpeg", tags: ["popular"], spicyLevel: 0 },
    { id: "cev-6", categoryId: "mariscos-frios", name: { es: "Cóctel de Camarón Frío", en: "Cold Shrimp Cocktail" }, description: { es: "Cóctel de camarón con salsa especial y verdura.", en: "Shrimp cocktail with special sauce and vegetables." }, price: 29.99, image: "", tags: [], spicyLevel: 0 },
    { id: "ost-1", categoryId: "mariscos-frios", name: { es: "Ostiones (12 piezas)", en: "Oysters (12 pieces)" }, description: { es: "Ostiones frescos en su concha.", en: "Fresh oysters in shell." }, price: 36.00, image: "", tags: [], spicyLevel: 0 },
    { id: "ost-2", categoryId: "mariscos-frios", name: { es: "Ostiones (6 piezas)", en: "Oysters (6 pieces)" }, description: { es: "Ostiones frescos en su concha.", en: "Fresh oysters in shell." }, price: 20.00, image: "/images/ostion6.jpeg", tags: [], spicyLevel: 0 },
    { id: "tos-1", categoryId: "mariscos-frios", name: { es: "Tostada de Ceviche Cocido o Curtido", en: "Cooked or Cured Ceviche Tostada" }, description: { es: "Tostada crujiente con ceviche de camarón.", en: "Crispy tostada with shrimp ceviche." }, price: 14.99, image: "", tags: [], spicyLevel: 0 },
    { id: "tos-2", categoryId: "mariscos-frios", name: { es: "Tostada de Pescado", en: "Fish Tostada" }, description: { es: "Tostada de ceviche de pescado.", en: "Fish ceviche tostada." }, price: 13.00, image: "", tags: [], spicyLevel: 0 },
    { id: "tos-3", categoryId: "mariscos-frios", name: { es: "Tostada de Ceviche o Aguachile con Pulpo", en: "Ceviche or Aguachile Tostada with Octopus" }, description: { es: "Tostada de ceviche/aguachile con pulpo.", en: "Ceviche/aguachile tostada topped with octopus." }, price: 18.00, image: "", tags: ["popular"], spicyLevel: 1 },
    { id: "tos-4", categoryId: "mariscos-frios", name: { es: "Tostada de Aguachile", en: "Aguachile Tostada" }, description: { es: "A elegir: verde, rojo, negro, piquín, al guacamole o mango habanero.", en: "Choice of: green, red, black, piquin, guacamole or mango habanero." }, price: 14.99, image: "/images/tostadaaguachile.jpeg", tags: [], spicyLevel: 2 },
    { id: "chi-1", categoryId: "mariscos-calientes", name: { es: "Chicharrón de Pescado Estilo Santa María del Oro", en: "Santa María del Oro Style Fish Chicharrón" }, description: { es: "Acompañado de guacamole, salsa mexicana, salsa verde de la casa, aderezo chipotle y tortillas hechas a mano.", en: "Served with guacamole, Mexican salsa, house green salsa, chipotle dressing, and handmade tortillas." }, price: 32.99, image: "", tags: ["chef"], spicyLevel: 0 },
    { id: "chi-2", categoryId: "mariscos-calientes", name: { es: "Chicharrón de Pescado Estilo Santa María del Oro (Para 4 personas)", en: "Santa María del Oro Style Fish Chicharrón (Serves 4)" }, description: { es: "Acompañado de guacamole, salsa mexicana, salsa verde de la casa, aderezo chipotle y tortillas hechas a mano.", en: "Served with guacamole, Mexican salsa, house green salsa, chipotle dressing, and handmade tortillas." }, price: 115.00, image: "images/chicharronpescado.jpeg", tags: ["chef", "popular"], spicyLevel: 0 },

    // --- CORTES & PARRILLA ---
    { id: "esp-1", categoryId: "cortes", name: { es: "Steak Sirloin (8 oz)", en: "Sirloin Steak (8 oz)" }, description: { es: "Corte de Sirloin 8 oz. Incluye 2 acompañamientos a elegir.", en: "8 oz Sirloin cut. Includes choice of 2 sides." }, price: 26.99, image: "images/steak2.jpeg", tags: ["chef"], spicyLevel: 0 },
    { id: "esp-2", categoryId: "cortes", name: { es: "Steak T-Bone (12 oz)", en: "T-Bone Steak (12 oz)" }, description: { es: "Corte T-Bone 12 oz. Incluye 2 acompañamientos a elegir.", en: "12 oz T-Bone cut. Includes choice of 2 sides." }, price: 31.99, image: "", tags: ["chef"], spicyLevel: 0 },
    { id: "lun-1", categoryId: "cortes", name: { es: "Fajitas de Pollo", en: "Chicken Fajitas" }, description: { es: "Fajitas de pollo con pimientos y cebolla.", en: "Chicken fajitas with peppers and onions." }, price: 26.00, image: "", tags: [], spicyLevel: 0 },
    { id: "lun-2", categoryId: "cortes", name: { es: "Fajitas de Res", en: "Beef Fajitas" }, description: { es: "Fajitas de res con pimientos y cebolla.", en: "Beef fajitas with peppers and onions." }, price: 27.00, image: "", tags: [], spicyLevel: 0 },
    { id: "lun-3", categoryId: "cortes", name: { es: "Fajitas de Camarón", en: "Shrimp Fajitas" }, description: { es: "Fajitas de camarón con pimientos y cebolla.", en: "Shrimp fajitas with peppers and onions." }, price: 29.99, image: "", tags: [], spicyLevel: 0 },
    { id: "lun-4", categoryId: "cortes", name: { es: "Carne Asada", en: "Carne Asada" }, description: { es: "Platillo tradicional de carne asada.", en: "Traditional grilled steak plate." }, price: 30.00, image: "", tags: ["popular"], spicyLevel: 0 },
    { id: "lun-5", categoryId: "cortes", name: { es: "Carne Asada de Arrachera", en: "Skirt Steak Carne Asada" }, description: { es: "Corte de arrachera a la parrilla.", en: "Grilled skirt steak cut." }, price: 36.00, image: "", tags: ["chef"], spicyLevel: 0 },
    { id: "lun-6", categoryId: "cortes", name: { es: "Carne Asada con Camarón", en: "Carne Asada with Shrimp" }, description: { es: "Carne asada combinada con camarones.", en: "Carne asada combined with shrimp." }, price: 33.00, image: "/images/carnecamaron.jpeg", tags: [], spicyLevel: 0 },
    { id: "lun-7", categoryId: "cortes", name: { es: "Chile Colorado de Res", en: "Beef Chile Colorado" }, description: { es: "Carne de res en guisado de chile colorado.", en: "Beef stewed in red chile sauce." }, price: 26.00, image: "", tags: [], spicyLevel: 1 },
    { id: "lun-8", categoryId: "cortes", name: { es: "Chile Verde de Pork", en: "Pork Chile Verde" }, description: { es: "Carne de cerdo en guisado de chile verde.", en: "Pork stewed in green chile sauce." }, price: 26.00, image: "", tags: [], spicyLevel: 1 },
    { id: "lun-10", categoryId: "cortes", name: { es: "Molcajete C.M.T. (Para 2 personas)", en: "C.M.T. Molcajete (Serves 2)" }, description: { es: "Servido caliente en molcajete tradicional.", en: "Served hot in traditional molcajete." }, price: 42.00, image: "", tags: ["chef"], spicyLevel: 1 },

    // --- TACOS & ANTOJITOS ---
    { id: "lun-9", categoryId: "antojitos", name: { es: "PizzaBirria", en: "PizzaBirria" }, description: { es: "Especialidad de birria estilo pizza.", en: "Birria specialty pizza style." }, price: 32, image: "/images/pizzabirria.jpeg", tags: ["popular"], spicyLevel: 0 },
    { id: "tac-1", categoryId: "antojitos", name: { es: "Tacos (Asada, Pastor, Pollo o Adobada)", en: "Tacos (Asada, Pastor, Chicken or Adobada)" }, description: { es: "Taco individual a elegir carne.", en: "Single taco with choice of meat." }, price: 5.00, image: "images/tacos2.jpeg", tags: [], spicyLevel: 0 },
    { id: "tac-2", categoryId: "antojitos", name: { es: "Taco de Lengua", en: "Beef Tongue Taco" }, description: { es: "Taco suave de lengua de res.", en: "Tender beef tongue taco." }, price: 7.00, image: "", tags: [], spicyLevel: 0 },
    { id: "tac-3", categoryId: "antojitos", name: { es: "Quesabirrias (Orden de 3)", en: "Quesabirrias (Order of 3)" }, description: { es: "Orden de 3 quesabirrias con consomé.", en: "Order of 3 quesabirrias with broth." }, price: 22.00, image: "", tags: ["popular"], spicyLevel: 0 },
    { id: "tac-4", categoryId: "antojitos", name: { es: "Tacos Capeados de Camarón (Orden de 3)", en: "Battered Shrimp Tacos (Order of 3)" }, description: { es: "3 tacos de camarón capeado.", en: "3 battered shrimp tacos." }, price: 22.00, image: "", tags: [], spicyLevel: 0 },
    { id: "tac-5", categoryId: "antojitos", name: { es: "Tacos Capeados de Pescado (Orden de 3)", en: "Battered Fish Tacos (Order of 3)" }, description: { es: "3 tacos de pescado capeado.", en: "3 battered fish tacos." }, price: 22.00, image: "", tags: [], spicyLevel: 0 },
    { id: "tac-6", categoryId: "antojitos", name: { es: "Tacos de Camarón Rancheros", en: "Ranchero Shrimp Tacos" }, description: { es: "Taco individual de camarón ranchero.", en: "Single ranchero shrimp taco." }, price: 8.00, image: "", tags: [], spicyLevel: 1 },
    { id: "tor-1", categoryId: "antojitos", name: { es: "Torta (Asada, Adobada o Pollo)", en: "Torta (Asada, Adobada or Chicken)" }, description: { es: "Torta tradicional mexicana a elegir carne.", en: "Traditional Mexican torta with choice of meat." }, price: 16.00, image: "", tags: [], spicyLevel: 0 },
    { id: "tor-2", categoryId: "antojitos", name: { es: "Torta de Lengua", en: "Beef Tongue Torta" }, description: { es: "Torta preparada con lengua de res.", en: "Prepared torta with beef tongue." }, price: 18.00, image: "", tags: [], spicyLevel: 0 },
    { id: "que-1", categoryId: "antojitos", name: { es: "Quesabirria Plain", en: "Plain Quesabirria" }, description: { es: "Quesadilla sencilla de birria.", en: "Simple birria quesadilla." }, price: 12.00, image: "", tags: [], spicyLevel: 0 },
    { id: "que-2", categoryId: "antojitos", name: { es: "Quesabirria de Harina", en: "Flour Quesabirria" }, description: { es: "Quesabirria servida en tortilla de harina.", en: "Quesabirria served on a flour tortilla." }, price: 16.00, image: "", tags: ["popular"], spicyLevel: 0 },
    { id: "que-3", categoryId: "antojitos", name: { es: "Quesadilla (Asada, Pollo o Adobada)", en: "Quesadilla (Asada, Chicken or Adobada)" }, description: { es: "Quesadilla con carne a elegir.", en: "Quesadilla with choice of meat." }, price: 16.00, image: "", tags: [], spicyLevel: 0 },
    { id: "que-4", categoryId: "antojitos", name: { es: "Quesadilla de Lengua", en: "Beef Tongue Quesadilla" }, description: { es: "Quesadilla grande con lengua de res.", en: "Large quesadilla with beef tongue." }, price: 18.00, image: "", tags: [], spicyLevel: 0 },

    // --- BURGERS & WINGS ---
    { id: "ham-1", categoryId: "burgers-wings", name: { es: "Hamburguesa de Res", en: "Beef Burger" }, description: { es: "Hamburguesa clásica de res.", en: "Classic beef burger." }, price: 21.00, image: "", tags: [], spicyLevel: 0 },
    { id: "ham-2", categoryId: "burgers-wings", name: { es: "Hamburguesa Hawaiian", en: "Hawaiian Burger" }, description: { es: "Con piña y queso derretido.", en: "With pineapple and melted cheese." }, price: 22.00, image: "", tags: [], spicyLevel: 0 },
    { id: "ham-3", categoryId: "burgers-wings", name: { es: "Hamburguesa de Camarón", en: "Shrimp Burger" }, description: { es: "Hamburguesa de camarones sazonados.", en: "Burger with seasoned shrimp." }, price: 23.00, image: "", tags: [], spicyLevel: 0 },
    { id: "ham-4", categoryId: "burgers-wings", name: { es: "Hamburguesa Mar y Tierra", en: "Surf & Turf Burger" }, description: { es: "Combinación de carne de res y camarón.", en: "Combination of beef patty and shrimp." }, price: 23.00, image: "", tags: ["chef"], spicyLevel: 0 },
    { id: "win-1", categoryId: "burgers-wings", name: { es: "Alitas Mango Habanero (6 pcs)", en: "Mango Habanero Wings (6 pcs)" }, description: { es: "6 piezas de alitas en salsa mango habanero.", en: "6 pieces of wings in mango habanero sauce." }, price: 13.00, image: "", tags: [], spicyLevel: 3 },
    { id: "win-2", categoryId: "burgers-wings", name: { es: "Alitas Búfalo (6 pcs)", en: "Buffalo Wings (6 pcs)" }, description: { es: "6 piezas de alitas en salsa búfalo picante.", en: "6 pieces of wings in spicy buffalo sauce." }, price: 13.00, image: "", tags: [], spicyLevel: 2 },
    { id: "win-3", categoryId: "burgers-wings", name: { es: "Alitas BBQ (6 pcs)", en: "BBQ Wings (6 pcs)" }, description: { es: "6 piezas de alitas en salsa BBQ agridulce.", en: "6 pieces of wings in sweet BBQ sauce." }, price: 13.00, image: "", tags: [], spicyLevel: 0 },

    // --- MENÚ KIDS ---
    { id: "kid-1", categoryId: "kids", name: { es: "Kids Enchilada", en: "Kids Enchilada" }, description: { es: "Incluye papas fritas y una soda o jugo.", en: "Includes french fries and a soda or juice." }, price: 12.00, image: "", tags: [], spicyLevel: 0 },
    { id: "kid-2", categoryId: "kids", name: { es: "Kids Quesadilla", en: "Kids Quesadilla" }, description: { es: "Incluye papas fritas y una soda o jugo.", en: "Includes french fries and a soda or juice." }, price: 12.00, image: "", tags: [], spicyLevel: 0 },
    { id: "kid-3", categoryId: "kids", name: { es: "Nuggets de pollo", en: "Kids Chicken Nuggets" }, description: { es: "Incluye papas fritas y una soda o jugo.", en: "Includes french fries and a soda or juice." }, price: 12.00, image: "", tags: ["popular"], spicyLevel: 0 },
    { id: "kid-4", categoryId: "kids", name: { es: "Kids Taco", en: "Kids Taco" }, description: { es: "Incluye papas fritas y una soda o jugo.", en: "Includes french fries and a soda or juice." }, price: 12.00, image: "", tags: [], spicyLevel: 0 },
    { id: "kid-5", categoryId: "kids", name: { es: "Kids Burrito", en: "Kids Burrito" }, description: { es: "Incluye papas fritas y una soda o jugo.", en: "Includes french fries and a soda or juice." }, price: 12.00, image: "", tags: [], spicyLevel: 0 },

    // --- EXTRAS  ---

    { id: "sid-1", categoryId: "extras", name: { es: "Papas Fritas", en: "French Fries" }, description: { es: "Papas fritas crujientes.", en: "Crispy french fries." }, price: 6.00, image: "", tags: [], spicyLevel: 0 },
    { id: "sid-2", categoryId: "extras", name: { es: "Puré de Papa", en: "Mashed Potatoes" }, description: { es: "Puré de papa casero.", en: "Homemade mashed potatoes." }, price: 4.00, image: "", tags: [], spicyLevel: 0 },
    { id: "sid-3", categoryId: "extras", name: { es: "Espárragos", en: "Asparagus" }, description: { es: "Espárragos a la parrilla.", en: "Grilled asparagus." }, price: 4.00, image: "", tags: [], spicyLevel: 0 },
    { id: "sid-4", categoryId: "extras", name: { es: "Ensalada", en: "Salad" }, description: { es: "Ensalada fresca de la casa.", en: "Fresh house salad." }, price: 4.00, image: "", tags: [], spicyLevel: 0 },
    { id: "sid-5", categoryId: "extras", name: { es: "Beans", en: "Beans" }, description: { es: "Frijoles de la casa.", en: "House beans." }, price: 4.00, image: "", tags: [], spicyLevel: 0 },
    { id: "sid-6", categoryId: "extras", name: { es: "Chips", en: "Chips" }, description: { es: "Totopos crujientes.", en: "Crispy tortilla chips." }, price: 4.00, image: "", tags: [], spicyLevel: 0 },
    { id: "sid-7", categoryId: "extras", name: { es: "Arroz", en: "Rice" }, description: { es: "Arroz de la casa.", en: "House rice." }, price: 4.00, image: "", tags: [], spicyLevel: 0 },
    { id: "sid-8", categoryId: "extras", name: { es: "Salsa", en: "Salsa" }, description: { es: "Salsa extra.", en: "Extra salsa." }, price: 2.00, image: "", tags: [], spicyLevel: 1 },
    { id: "sid-9", categoryId: "extras", name: { es: "Aguacate", en: "Avocado" }, description: { es: "Porción de aguacate.", en: "Side of avocado." }, price: 3.00, image: "", tags: [], spicyLevel: 0 },
    { id: "sid-10", categoryId: "extras", name: { es: "Tortillas", en: "Tortillas" }, description: { es: "Orden de tortillas hechas a mano.", en: "Order of handmade tortillas." }, price: 4.00, image: "", tags: [], spicyLevel: 0 },

    // --- POSTRES ---
    { id: "pos-1", categoryId: "postres", name: { es: "Pastel de Tres Leches", en: "Tres Leches Cake" }, description: { es: "Pastel esponjoso bañado en tres tipos de leche.", en: "Soft sponge cake soaked in three kinds of milk." }, price: 7.00, image: "", tags: [], spicyLevel: 0 },
    { id: "pos-2", categoryId: "postres", name: { es: "Flan", en: "Flan" }, description: { es: "Flan casero bañado en caramelo.", en: "Homemade custard topped with caramel." }, price: 7.00, image: "", tags: [], spicyLevel: 0 },
    // --- BEBIDAS Y BAR ---
    // Sin Alcohol
    { id: "beb-1", categoryId: "bebidas", subcategoryId: "sin-alcohol", name: { es: "Refresco Sencillo", en: "Single Soda" }, description: { es: "Refresco de lata a elegir.", en: "Choice of canned soda." }, price: 3.50, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-2", categoryId: "bebidas", subcategoryId: "sin-alcohol", name: { es: "Refresco con Vaso Preparado", en: "Soda with Prepared Glass" }, description: { es: "Vaso escarchado con sal, limón o tajín.", en: "Rimmed glass with salt, lime or tajin." }, price: 5.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-3", categoryId: "bebidas", subcategoryId: "sin-alcohol", name: { es: "Red Bull", en: "Red Bull" }, description: { es: "Bebida energizante.", en: "Energy drink." }, price: 8.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-4", categoryId: "bebidas", subcategoryId: "sin-alcohol", name: { es: "Mineral Preparada", en: "Prepared Sparkling Water" }, description: { es: "Agua mineral con limón y sal.", en: "Sparkling water with lime and salt." }, price: 5.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-5", categoryId: "bebidas", subcategoryId: "sin-alcohol", name: { es: "Rusa", en: "Rusa" }, description: { es: "Agua mineral, toronja, limón y sal.", en: "Sparkling water, grapefruit soda, lime and salt." }, price: 8.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-6", categoryId: "bebidas", subcategoryId: "sin-alcohol", name: { es: "Piñada", en: "Virgin Piña Colada" }, description: { es: "Crema de coco, jugo de piña y hielo.", en: "Coconut cream, pineapple juice and ice." }, price: 10.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-7", categoryId: "bebidas", subcategoryId: "sin-alcohol", name: { es: "Conga", en: "Conga" }, description: { es: "Mezcla de jugos de frutas naturales.", en: "Mixed natural fruit juices." }, price: 10.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-8", categoryId: "bebidas", subcategoryId: "sin-alcohol", name: { es: "Shirley Temple", en: "Shirley Temple" }, description: { es: "Refresco de lima-limón con granadina y cereza.", en: "Lemon-lime soda with granadine and cherry." }, price: 8.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-9", categoryId: "bebidas", subcategoryId: "sin-alcohol", name: { es: "Roy Rogers", en: "Roy Rogers" }, description: { es: "Refresco de cola con granadina y cereza.", en: "Cola soda with granadine and cherry." }, price: 8.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-10", categoryId: "bebidas", subcategoryId: "sin-alcohol", name: { es: "Clamato Sencillo", en: "Plain Clamato" }, description: { es: "Jugo de tomate sazonado sin alcohol.", en: "Seasoned tomato juice without alcohol." }, price: 10.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-11", categoryId: "bebidas", subcategoryId: "sin-alcohol", name: { es: "Clamato Especial Preparado", en: "Special Prepared Clamato" }, description: { es: "Clamato sazonado con salsas de la casa y escarchado.", en: "Clamato seasoned with house sauces and rimmed glass." }, price: 12.00, image: "", tags: ["popular"], spicyLevel: 0 },

    // Jugos y Aguas
    { id: "beb-12", categoryId: "bebidas", subcategoryId: "jugos-aguas", name: { es: "Jugo de Naranja", en: "Orange Juice" }, description: { es: "Jugo natural fresco.", en: "Fresh natural orange juice." }, price: 6.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-13", categoryId: "bebidas", subcategoryId: "jugos-aguas", name: { es: "Jugo de Manzana", en: "Apple Juice" }, description: { es: "Jugo de manzana.", en: "Apple juice." }, price: 5.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-14", categoryId: "bebidas", subcategoryId: "jugos-aguas", name: { es: "Jugo de Piña", en: "Pineapple Juice" }, description: { es: "Jugo de piña.", en: "Pineapple juice." }, price: 5.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-15", categoryId: "bebidas", subcategoryId: "jugos-aguas", name: { es: "Jugo de Tomate", en: "Tomato Juice" }, description: { es: "Jugo de tomate natural.", en: "Natural tomato juice." }, price: 5.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-16", categoryId: "bebidas", subcategoryId: "jugos-aguas", name: { es: "Jugo de Arándano", en: "Cranberry Juice" }, description: { es: "Jugo de arándano.", en: "Cranberry juice." }, price: 5.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-17", categoryId: "bebidas", subcategoryId: "jugos-aguas", name: { es: "Agua embotellada", en: "Bottled Water" }, description: { es: "Agua natural en botella.", en: "Bottled natural water." }, price: 3.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-18", categoryId: "bebidas", subcategoryId: "jugos-aguas", name: { es: "Agua Fresca Horchata o Jamaica (Vaso)", en: "Glass of Horchata or Jamaica" }, description: { es: "Agua fresca tradicional servida en vaso.", en: "Traditional fresh water served in a glass." }, price: 5.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-19", categoryId: "bebidas", subcategoryId: "jugos-aguas", name: { es: "Jarra de Agua Horchata o Jamaica", en: "Pitcher of Horchata or Jamaica" }, description: { es: "Jarra de agua fresca tradicional para compartir.", en: "Pitcher of traditional fresh water to share." }, price: 16.00, image: "", tags: [], spicyLevel: 0 },

    // Cócteles
    { id: "beb-20", categoryId: "bebidas", subcategoryId: "cocteles", name: { es: "Margarita Tradicional", en: "Traditional Margarita" }, description: { es: "Tequila, licor de naranja y jugo de limón fresco.", en: "Tequila, orange liqueur and fresh lime juice." }, price: 12.00, image: "", tags: ["popular"], spicyLevel: 0 },
    { id: "beb-21", categoryId: "bebidas", subcategoryId: "cocteles", name: { es: "Margarita de Sabor", en: "Flavored Margarita" }, description: { es: "A elegir: Fresa, Mango, Tamarindo, Maracuyá o Piña.", en: "Choice of: Strawberry, Mango, Tamarind, Passion Fruit or Pineapple." }, price: 14.00, image: "/images/margarita.jpeg", tags: [], spicyLevel: 0 },
    { id: "beb-22", categoryId: "bebidas", subcategoryId: "cocteles", name: { es: "Margarita Cadillacs", en: "Cadillac Margarita" }, description: { es: "Tequila reposado, Grand Marnier y jugo de limón.", en: "Reposado tequila, Grand Marnier and lime juice." }, price: 16.00, image: "", tags: ["chef"], spicyLevel: 0 },
    { id: "beb-23", categoryId: "bebidas", subcategoryId: "cocteles", name: { es: "Piña Colada", en: "Piña Colada" }, description: { es: "Ron blanco, crema de coco y jugo de piña.", en: "White rum, coconut cream and pineapple juice." }, price: 12.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-24", categoryId: "bebidas", subcategoryId: "cocteles", name: { es: "Cantarito", en: "Cantarito" }, description: { es: "Tequila, jugo de toronja, naranja, limón, refresco de toronja y sal.", en: "Tequila, grapefruit, orange and lime juice, grapefruit soda and salt." }, price: 14.00, image: "", tags: ["popular"], spicyLevel: 0 },
    { id: "beb-25", categoryId: "bebidas", subcategoryId: "cocteles", name: { es: "Mojito Tradicional", en: "Traditional Mojito" }, description: { es: "Ron, hierbabuena fresca, azúcar, limón y agua mineral.", en: "Rum, fresh mint, sugar, lime and sparkling water." }, price: 12.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-26", categoryId: "bebidas", subcategoryId: "cocteles", name: { es: "Mojito de Sabor", en: "Flavored Mojito" }, description: { es: "A elegir: Fresa, Mango, Maracuyá o Frutos Rojos.", en: "Choice of: Strawberry, Mango, Passion Fruit or Red Berries." }, price: 14.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-27", categoryId: "bebidas", subcategoryId: "cocteles", name: { es: "Paloma", en: "Paloma" }, description: { es: "Tequila, refresco de toronja, limón y sal.", en: "Tequila, grapefruit soda, lime and salt." }, price: 11.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-28", categoryId: "bebidas", subcategoryId: "cocteles", name: { es: "Charro Negro", en: "Charro Negro" }, description: { es: "Tequila, refresco de cola, limón y sal.", en: "Tequila, cola soda, lime and salt." }, price: 11.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-29", categoryId: "bebidas", subcategoryId: "cocteles", name: { es: "Vampiro", en: "Vampiro" }, description: { es: "Tequila, viuda de sangrita, refresco de toronja y limón.", en: "Tequila, sangrita, grapefruit soda and lime." }, price: 12.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-30", categoryId: "bebidas", subcategoryId: "cocteles", name: { es: "Long Island Iced Tea", en: "Long Island Iced Tea" }, description: { es: "Vodka, ron, ginebra, tequila, triple sec, sour mix y cola.", en: "Vodka, rum, gin, tequila, triple sec, sour mix and cola." }, price: 15.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-31", categoryId: "bebidas", subcategoryId: "cocteles", name: { es: "Adios Motherfucker (AMF)", en: "Adios Motherfucker (AMF)" }, description: { es: "Vodka, ron, ginebra, tequila, curacao azul, sour mix y sprite.", en: "Vodka, rum, gin, tequila, blue curacao, sour mix and sprite." }, price: 15.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-32", categoryId: "bebidas", subcategoryId: "cocteles", name: { es: "Tequila Sunrise", en: "Tequila Sunrise" }, description: { es: "Tequila, jugo de naranja y granadina.", en: "Tequila, orange juice and granadine." }, price: 12.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-33", categoryId: "bebidas", subcategoryId: "cocteles", name: { es: "Sex on the Beach", en: "Sex on the Beach" }, description: { es: "Vodka, licor de durazno, jugo de naranja y arándano.", en: "Vodka, peach schnapps, orange juice and cranberry juice." }, price: 13.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-34", categoryId: "bebidas", subcategoryId: "cocteles", name: { es: "Bloody Mary", en: "Bloody Mary" }, description: { es: "Vodka, jugo de tomate sazonado, picante y apio.", en: "Vodka, seasoned tomato juice, hot sauce and celery." }, price: 13.00, image: "", tags: [], spicyLevel: 1 },
    { id: "beb-35", categoryId: "bebidas", subcategoryId: "cocteles", name: { es: "Clamato Preparado con Vodka / Tequila", en: "Prepared Clamato with Vodka / Tequila" }, description: { es: "Clamato sazonado con licor a elegir.", en: "Seasoned Clamato with choice of liquor." }, price: 15.00, image: "", tags: ["popular"], spicyLevel: 1 },

    // Shots / Rondas
    { id: "beb-36", categoryId: "bebidas", subcategoryId: "shots-rondas", name: { es: "Shot de Tequila de la Casa", en: "House Tequila Shot" }, description: { es: "Caballito de tequila servido con limón y sal.", en: "Tequila shot served with lime and salt." }, price: 6.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-37", categoryId: "bebidas", subcategoryId: "shots-rondas", name: { es: "Shot Don Julio 70", en: "Don Julio 70 Shot" }, description: { es: "Caballito de Tequila Don Julio 70.", en: "Don Julio 70 Tequila shot." }, price: 12.00, image: "", tags: ["chef"], spicyLevel: 0 },
    { id: "beb-38", categoryId: "bebidas", subcategoryId: "shots-rondas", name: { es: "Shot Fireball", en: "Fireball Shot" }, description: { es: "Whisky de canela.", en: "Cinnamon whisky shot." }, price: 7.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-39", categoryId: "bebidas", subcategoryId: "shots-rondas", name: { es: "Shot Lemon Drop", en: "Lemon Drop Shot" }, description: { es: "Vodka, licor de naranja y jugo de limón con azúcar.", en: "Vodka, orange liqueur and lime juice with sugar." }, price: 8.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-40", categoryId: "bebidas", subcategoryId: "shots-rondas", name: { es: "Shot B-52", en: "B-52 Shot" }, description: { es: "Kahlúa, Baileys y Grand Marnier en capas.", en: "Layered Kahlúa, Baileys and Grand Marnier." }, price: 9.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-41", categoryId: "bebidas", subcategoryId: "shots-rondas", name: { es: "Ronda de Shots (6 pcs)", en: "Round of Shots (6 pcs)" }, description: { es: "6 shots a elegir de la casa.", en: "6 choice house shots." }, price: 32.00, image: "", tags: ["popular"], spicyLevel: 0 },

    // Cervezas
    { id: "beb-42", categoryId: "bebidas", subcategoryId: "cervezas", name: { es: "Corona Extra / Light", en: "Corona Extra / Light" }, description: { es: "Botella 355 ml.", en: "355 ml bottle." }, price: 5.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-43", categoryId: "bebidas", subcategoryId: "cervezas", name: { es: "Modelo Especial / Negra", en: "Modelo Especial / Negra" }, description: { es: "Botella 355 ml.", en: "355 ml bottle." }, price: 5.50, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-44", categoryId: "bebidas", subcategoryId: "cervezas", name: { es: "Pacifico Clara / Light", en: "Pacifico Clara / Light" }, description: { es: "Botella 355 ml.", en: "355 ml bottle." }, price: 5.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-45", categoryId: "bebidas", subcategoryId: "cervezas", name: { es: "Victoria", en: "Victoria" }, description: { es: "Botella 355 ml.", en: "355 ml bottle." }, price: 5.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-46", categoryId: "bebidas", subcategoryId: "cervezas", name: { es: "Michelob Ultra", en: "Michelob Ultra" }, description: { es: "Botella 355 ml.", en: "355 ml bottle." }, price: 5.50, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-47", categoryId: "bebidas", subcategoryId: "cervezas", name: { es: "Bud Light / Coors Light", en: "Bud Light / Coors Light" }, description: { es: "Botella 355 ml.", en: "355 ml bottle." }, price: 4.50, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-48", categoryId: "bebidas", subcategoryId: "cervezas", name: { es: "Heineken / Stella Artois", en: "Heineken / Stella Artois" }, description: { es: "Cerveza importada.", en: "Imported beer." }, price: 6.00, image: "", tags: [], spicyLevel: 0 },

    // Preparadas, Caguamas y Cubetas
    { id: "beb-49", categoryId: "bebidas", subcategoryId: "preparadas-cubetas", name: { es: "Chelada", en: "Chelada" }, description: { es: "Cerveza a elegir con jugo de limón y sal.", en: "Choice of beer with lime juice and salt." }, price: 7.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-50", categoryId: "bebidas", subcategoryId: "preparadas-cubetas", name: { es: "Michelada", en: "Michelada" }, description: { es: "Cerveza, limón, sal, maggi, inglesa y salsa picante.", en: "Beer, lime, salt, maggi, worcestershire and hot sauce." }, price: 8.50, image: "", tags: ["popular"], spicyLevel: 1 },
    { id: "beb-51", categoryId: "bebidas", subcategoryId: "preparadas-cubetas", name: { es: "Clamato con Cerveza (Ojo Rojo)", en: "Clamato with Beer (Ojo Rojo)" }, description: { es: "Cerveza preparada con mezcla de clamato y especias.", en: "Beer prepared with clamato mix and spices." }, price: 11.00, image: "", tags: ["popular"], spicyLevel: 1 },
    { id: "beb-52", categoryId: "bebidas", subcategoryId: "preparadas-cubetas", name: { es: "Caguama Sencilla", en: "Single Caguama" }, description: { es: "Cerveza en presentación familiar (940 ml).", en: "Large family size beer (940 ml)." }, price: 10.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-53", categoryId: "bebidas", subcategoryId: "preparadas-cubetas", name: { es: "Caguama Preparada / Michelada", en: "Prepared Caguama / Michelada" }, description: { es: "Caguama preparada estilo michelada en vaso gigante.", en: "Prepared caguama michelada style in a giant cup." }, price: 15.00, image: "", tags: [], spicyLevel: 1 },
    { id: "beb-54", categoryId: "bebidas", subcategoryId: "preparadas-cubetas", name: { es: "Cubeta de Cerveza Nacional (6 pcs)", en: "Domestic Beer Bucket (6 pcs)" }, description: { es: "6 cervezas nacionales heladas en cubeta con hielo.", en: "6 cold domestic beers in an ice bucket." }, price: 26.00, image: "", tags: ["popular"], spicyLevel: 0 },
    { id: "beb-55", categoryId: "bebidas", subcategoryId: "preparadas-cubetas", name: { es: "Cubeta de Cerveza Importada (6 pcs)", en: "Imported Beer Bucket (6 pcs)" }, description: { es: "6 cervezas importadas heladas en cubeta.", en: "6 cold imported beers in an ice bucket." }, price: 30.00, image: "", tags: [], spicyLevel: 0 },

    // Tequila
    { id: "beb-56", categoryId: "bebidas", subcategoryId: "tequila", name: { es: "Copa Don Julio Blanco", en: "Don Julio Blanco (Glass)" }, description: { es: "Trago de tequila Don Julio Blanco.", en: "Glass of Don Julio Blanco tequila." }, price: 11.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-57", categoryId: "bebidas", subcategoryId: "tequila", name: { es: "Copa Don Julio Reposado", en: "Don Julio Reposado (Glass)" }, description: { es: "Trago de tequila Don Julio Reposado.", en: "Glass of Don Julio Reposado tequila." }, price: 12.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-58", categoryId: "bebidas", subcategoryId: "tequila", name: { es: "Copa Don Julio 70", en: "Don Julio 70 (Glass)" }, description: { es: "Trago de tequila cristalino Don Julio 70.", en: "Glass of Don Julio 70 añejo cristalino tequila." }, price: 15.00, image: "", tags: ["chef"], spicyLevel: 0 },
    { id: "beb-59", categoryId: "bebidas", subcategoryId: "tequila", name: { es: "Copa 1800 Reposado / Cristalino", en: "1800 Reposado / Cristalino (Glass)" }, description: { es: "Trago de Tequila 1800.", en: "Glass of 1800 Tequila." }, price: 12.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-60", categoryId: "bebidas", subcategoryId: "tequila", name: { es: "Copa Casamigos Blanco / Reposado", en: "Casamigos Blanco / Reposado (Glass)" }, description: { es: "Trago de Tequila Casamigos.", en: "Glass of Casamigos Tequila." }, price: 14.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-61", categoryId: "bebidas", subcategoryId: "tequila", name: { es: "Botella Don Julio 70", en: "Don Julio 70 Bottle" }, description: { es: "Botella incluye 4 refrescos o mezcladores.", en: "Bottle includes 4 sodas or mixers." }, price: 160.00, image: "", tags: ["chef"], spicyLevel: 0 },
    { id: "beb-62", categoryId: "bebidas", subcategoryId: "tequila", name: { es: "Botella 1800 Reposado", en: "1800 Reposado Bottle" }, description: { es: "Botella incluye 4 refrescos o mezcladores.", en: "Bottle includes 4 sodas or mixers." }, price: 130.00, image: "", tags: [], spicyLevel: 0 },

    // Whisky & Vino
    { id: "beb-63", categoryId: "bebidas", subcategoryId: "whisky-vino", name: { es: "Copa Buchanan's 12", en: "Buchanan's 12 (Glass)" }, description: { es: "Trago de whisky Buchanan's 12 Años.", en: "Glass of Buchanan's 12 Year whisky." }, price: 13.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-64", categoryId: "bebidas", subcategoryId: "whisky-vino", name: { es: "Copa Johnnie Walker Black Label", en: "Johnnie Walker Black Label (Glass)" }, description: { es: "Trago de whisky Etiqueta Negra.", en: "Glass of Black Label whisky." }, price: 13.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-65", categoryId: "bebidas", subcategoryId: "whisky-vino", name: { es: "Copa Jack Daniel's", en: "Jack Daniel's (Glass)" }, description: { es: "Trago de Tennessee Whiskey.", en: "Glass of Tennessee Whiskey." }, price: 11.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-66", categoryId: "bebidas", subcategoryId: "whisky-vino", name: { es: "Copa de Vino Tinto de la Casa", en: "House Red Wine (Glass)" }, description: { es: "Copa de vino tinto seleccionado.", en: "Glass of selected red wine." }, price: 9.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-67", categoryId: "bebidas", subcategoryId: "whisky-vino", name: { es: "Copa de Vino Blanco de la Casa", en: "House White Wine (Glass)" }, description: { es: "Copa de vino blanco frío.", en: "Glass of chilled white wine." }, price: 9.00, image: "", tags: [], spicyLevel: 0 },
    { id: "beb-68", categoryId: "bebidas", subcategoryId: "whisky-vino", name: { es: "Sangría", en: "Sangria" }, description: { es: "Vino tinto, jugo de frutas, toque de licor y fruta picada.", en: "Red wine, fruit juice, touch of liquor and chopped fruit." }, price: 11.00, image: "", tags: ["popular"], spicyLevel: 0 },
    { id: "beb-69", categoryId: "bebidas", subcategoryId: "whisky-vino", name: { es: "Botella Buchanan's 12", en: "Buchanan's 12 Bottle" }, description: { es: "Incluye 4 refrescos o mezcladores.", en: "Includes 4 sodas or mixers." }, price: 150.00, image: "", tags: [], spicyLevel: 0 }
  ]
};

export default function App() {
  const [language, setLanguage] = useState('es');
  // view: 'home' (grid de categorías) | 'category' (items de una categoría normal)
  //     | 'bebidas' (grid de subcategorías) | 'bebidas-sub' (items de una subcategoría de bebidas)
  const [view, setView] = useState('home');
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterSpicy, setFilterSpicy] = useState(false);
  const [filterChef, setFilterChef] = useState(false);
  const [filterPromo, setFilterPromo] = useState(false);

  useEffect(() => {
    document.title = language === 'es'
      ? "LA LUNA KITCHEN & BAR - Menú Digital"
      : "LA LUNA KITCHEN & BAR - Digital Menu";
  }, [language]);

  const handleChefClick = () => {
    const nextState = !filterChef;
    setFilterChef(nextState);
    if (nextState) setFilterPromo(false);
  };

  const handlePromoClick = () => {
    const nextState = !filterPromo;
    setFilterPromo(nextState);
    if (nextState) setFilterChef(false);
  };

  // Al presionar una categoría desde la pantalla principal
  const handleCategoryClick = (catId) => {
    if (catId === 'bebidas') {
      setView('bebidas');
    } else {
      setActiveCategory(catId);
      setView('category');
    }
  };

  // Al presionar una subcategoría de bebidas
  const handleSubcategoryClick = (subId) => {
    setSelectedSubcategory(subId);
    setActiveCategory('bebidas');
    setView('bebidas-sub');
  };

  // Regresar a la pantalla principal de categorías
  const goHome = () => {
    setView('home');
    setActiveCategory(null);
    setSelectedSubcategory(null);
    setSearchQuery('');
  };

  // Regresar de una subcategoría de bebidas al listado de subcategorías
  const goBackToBebidas = () => {
    setView('bebidas');
    setSelectedSubcategory(null);
  };

  const isSearching = searchQuery.trim().length > 0;

  const filteredItems = useMemo(() => {
    return MENU_DATA.items.filter(item => {
      const matchesCategory = isSearching
        ? true
        : view === 'category'
          ? item.categoryId === activeCategory
          : view === 'bebidas-sub'
            ? item.categoryId === 'bebidas' && item.subcategoryId === selectedSubcategory
            : false; // en 'home' y 'bebidas' sin búsqueda no listamos platillos

      const nameText = item.name[language]?.toLowerCase() || '';
      const descText = item.description[language]?.toLowerCase() || '';
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || nameText.includes(query) || descText.includes(query);

      const matchesSpicy = !filterSpicy || item.spicyLevel > 0;
      const matchesChef = !filterChef || item.tags.includes('chef');
      const matchesPromo = !filterPromo || item.tags.includes('promo');

      return matchesCategory && matchesSearch && matchesSpicy && matchesChef && matchesPromo;
    });
  }, [view, activeCategory, selectedSubcategory, searchQuery, language, filterSpicy, filterChef, filterPromo, isSearching]);

  const t = {
    searchPlaceholder: language === 'es' ? 'Buscar platillo, ingrediente...' : 'Search dish, ingredient...',
    chefSpecial: language === 'es' ? 'Especial de la Casa' : "House Special",
    monthlyPromos: language === 'es' ? 'Promos del Mes 🏷️' : 'Monthly Deals 🏷️',
    spicyOnly: language === 'es' ? 'Con Picante 🌶️' : 'Spicy Dishes 🌶️',
    currency: '$',
    noResults: language === 'es' ? 'No se encontraron platillos con estos criterios.' : 'No items matched your search criteria.',
    close: language === 'es' ? 'Cerrar' : 'Close',
    back: language === 'es' ? 'Volver' : 'Back',
    backToCategories: language === 'es' ? 'Volver a categorías' : 'Back to categories',
    backToDrinks: language === 'es' ? 'Volver a bebidas' : 'Back to drinks',
    chooseCategory: language === 'es' ? 'Elige una categoría' : 'Choose a category',
    chooseDrinkType: language === 'es' ? '¿Qué te gustaría tomar?' : 'What would you like to drink?',
    itemsCount: language === 'es' ? 'platillos' : 'items',
    footerNotice: language === 'es'
      ? '*Estos platos se sirven crudos o medio crudos. El consumo de carnes de res y aves de corral, mariscos, crustáceos o huevos crudos o casi crudos puede aumentar el riesgo de enfermedades transmitidos por los alimentos, especialmente si usted tiene ciertas enfermedades.'
      : '*These dishes are served raw or undercooked. Consuming raw or undercooked beef, poultry, seafood, shellfish, or eggs may increase your risk of foodborne illness, especially if you have certain medical conditions.'
  };

  // Cuenta cuántos items tiene cada categoría (para mostrarlo en la tarjeta)
  const categoryCount = (catId) => MENU_DATA.items.filter(i => i.categoryId === catId).length;
  const subcategoryCount = (subId) => MENU_DATA.items.filter(i => i.categoryId === 'bebidas' && i.subcategoryId === subId).length;

  const currentCategoryLabel = activeCategory
    ? MENU_DATA.categories.find(c => c.id === activeCategory)?.label[language]
    : '';
  const currentSubcategoryLabel = selectedSubcategory
    ? BEVERAGE_SUBCATEGORIES.find(s => s.id === selectedSubcategory)?.name[language]
    : '';

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F9F9FB] font-sans selection:bg-[#C5A880] selection:text-black pb-20">

      {/* HEADER SUPERIOR */}
      <header className="sticky top-0 z-40 bg-[#0B0B0B]/95 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 py-4 flex flex-col items-center justify-center relative">

          {/* Botón de Idioma */}
          <div className="absolute right-4 top-4">
            <button
              onClick={() => setLanguage(l => l === 'es' ? 'en' : 'es')}
              aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-neutral-900 border border-neutral-700 text-xs tracking-wider uppercase hover:border-neutral-500 active:scale-95 transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="font-semibold text-[#F9F9FB]">{language === 'es' ? 'EN' : 'ES'}</span>
            </button>
          </div>

          {/* Botón Volver (si no estamos en home) */}
          {view !== 'home' && !isSearching && (
            <div className="absolute left-4 top-4">
              <button
                onClick={view === 'bebidas-sub' ? goBackToBebidas : goHome}
                aria-label={t.back}
                className="flex items-center gap-1 px-3 py-2 rounded-full bg-neutral-900 border border-neutral-700 text-xs hover:border-neutral-500 active:scale-95 transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="font-semibold text-[#F9F9FB] hidden sm:inline">{t.back}</span>
              </button>
            </div>
          )}

          {/* Logo y Subtítulo */}
          <button
            onClick={goHome}
            className="text-center my-1 select-none focus:outline-none"
            aria-label={t.backToCategories}
          >
            <h1 className="text-3xl sm:text-4xl font-light tracking-[0.3em] text-white font-serif uppercase leading-none">
              LA LUNΛ
            </h1>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="h-[1px] w-8 bg-neutral-600"></span>
              <span className="text-[10px] sm:text-xs tracking-[0.35em] text-neutral-300 font-light uppercase">
                {MENU_DATA.restaurant.subtitle}
              </span>
              <span className="h-[1px] w-8 bg-neutral-600"></span>
            </div>
          </button>

          {/* BUSCADOR */}
          <div className="w-full mt-4 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-neutral-900/90 border border-neutral-800 rounded-lg pl-10 pr-9 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label={language === 'es' ? 'Borrar búsqueda' : 'Clear search'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/*  FILTROS RÁPIDOS 
          <div className="flex items-center gap-2 mt-3 w-full overflow-x-auto no-scrollbar py-1 text-xs">
            <button
              onClick={handleChefClick}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border whitespace-nowrap transition-colors active:scale-95 ${filterChef
                ? 'bg-[#C5A880]/20 border-[#C5A880] text-[#C5A880]'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
            >
              <Award className="w-3.5 h-3.5" />
              {t.chefSpecial}
            </button>

            <button
              onClick={handlePromoClick}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border whitespace-nowrap transition-colors active:scale-95 ${filterPromo
                ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
            >
              <Tag className="w-3.5 h-3.5" />
              {t.monthlyPromos}
            </button>

            <button
              onClick={() => setFilterSpicy(!filterSpicy)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border whitespace-nowrap transition-colors active:scale-95 ${filterSpicy
                ? 'bg-red-950/40 border-red-500 text-red-400'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
            >
              <Flame className="w-3.5 h-3.5" />
              {t.spicyOnly}
            </button>
          </div> */}

        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-3xl mx-auto px-4 pt-6">

        {isSearching ? (
          <>
            <div className="mb-6 flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="text-xs uppercase tracking-widest text-neutral-400">
                {language === 'es' ? 'Resultados para:' : 'Results for:'} <strong className="text-white">"{searchQuery}"</strong>
              </span>
              <span className="text-xs text-neutral-500">{filteredItems.length} {t.itemsCount}</span>
            </div>
            <ItemList items={filteredItems} language={language} t={t} onSelect={setSelectedItem} />
          </>
        ) : view === 'home' ? (
          <>
            <div className="mb-6 text-center">
              <h2 className="text-xl font-light tracking-[0.2em] text-white uppercase font-serif">
                {t.chooseCategory}
              </h2>
              <div className="w-8 h-[1px] bg-[#C5A880] mx-auto mt-2"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {MENU_DATA.categories.map((cat) => {
                const Icon = cat.icon;
                const count = cat.id === 'bebidas'
                  ? MENU_DATA.items.filter(i => i.categoryId === 'bebidas').length
                  : categoryCount(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="flex flex-col items-center justify-center gap-3 bg-neutral-900/60 border border-neutral-800/80 hover:border-[#C5A880] active:scale-95 rounded-2xl py-7 px-3 transition-all duration-150 text-center group"
                  >
                    <span className="w-14 h-14 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center group-hover:border-[#C5A880] transition-colors">
                      <Icon className="w-6 h-6 text-[#C5A880]" strokeWidth={1.5} />
                    </span>
                    <span className="text-sm font-medium text-white leading-tight">
                      {cat.label[language]}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      {count} {t.itemsCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        ) : view === 'bebidas' ? (
          <>
            <div className="mb-6 text-center">
              <h2 className="text-xl font-light tracking-[0.2em] text-white uppercase font-serif flex items-center justify-center gap-2">
                <Wine className="w-5 h-5 text-[#C5A880]" />
                {t.chooseDrinkType}
              </h2>
              <div className="w-8 h-[1px] bg-[#C5A880] mx-auto mt-2"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {BEVERAGE_SUBCATEGORIES.map((sub) => {
                const Icon = sub.icon;
                return (
                  <button
                    key={sub.id}
                    onClick={() => handleSubcategoryClick(sub.id)}
                    className="flex flex-col items-center justify-center gap-3 bg-neutral-900/60 border border-neutral-800/80 hover:border-[#C5A880] active:scale-95 rounded-2xl py-7 px-3 transition-all duration-150 text-center group"
                  >
                    <span className="w-14 h-14 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center group-hover:border-[#C5A880] transition-colors">
                      <Icon className="w-6 h-6 text-[#C5A880]" strokeWidth={1.5} />
                    </span>
                    <span className="text-sm font-medium text-white leading-tight">
                      {sub.name[language]}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      {subcategoryCount(sub.id)} {t.itemsCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        ) : view === 'bebidas-sub' ? (
          <>
            <div className="mb-6 text-center">
              <h2 className="text-xl font-light tracking-[0.2em] text-white uppercase font-serif">
                {currentSubcategoryLabel}
              </h2>
              <div className="w-8 h-[1px] bg-[#C5A880] mx-auto mt-2"></div>
            </div>
            <ItemList items={filteredItems} language={language} t={t} onSelect={setSelectedItem} />
          </>
        ) : (
          <>
            <div className="mb-6 text-center">
              <h2 className="text-xl font-light tracking-[0.2em] text-white uppercase font-serif">
                {currentCategoryLabel}
              </h2>
              <div className="w-8 h-[1px] bg-[#C5A880] mx-auto mt-2"></div>
            </div>
            <ItemList items={filteredItems} language={language} t={t} onSelect={setSelectedItem} />
          </>
        )}

      </main>

      {/* FOOTER */}
      <footer className="max-w-3xl mx-auto px-4 mt-12 pt-6 border-t border-neutral-800/60 text-center">
        <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-lg mx-auto">
          {t.footerNotice}
        </p>
        <p className="text-[10px] text-neutral-600 uppercase tracking-widest mt-4">
          LA LUNA KITCHEN & BAR © {new Date().getFullYear()}
        </p>
      </footer>

      {/* MODAL DETALLE DE PLATILLO */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-[#121212] border border-neutral-800 rounded-t-2xl sm:rounded-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 sm:h-64 bg-neutral-950 border-b border-neutral-800 flex items-center justify-center">
              {selectedItem.image ? (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name[language]}
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-neutral-900 to-[#121212] text-neutral-600">
                  <UtensilsCrossed className="w-10 h-10 stroke-[1] mb-2 text-neutral-700" />
                  <span className="text-xs tracking-widest uppercase font-serif text-neutral-500">
                    LA LUNA KITCHEN & BAR
                  </span>
                </div>
              )}

              <button
                onClick={() => setSelectedItem(null)}
                aria-label={t.close}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white p-2 rounded-full backdrop-blur-md border border-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex items-start justify-between gap-4 mt-2">
                <h2 className="text-xl font-medium text-white font-serif leading-snug">
                  {selectedItem.name[language]}
                </h2>
                <span className="text-lg font-bold text-[#C5A880] whitespace-nowrap">
                  {t.currency}{selectedItem.price.toFixed(2)}
                </span>
              </div>

              <div className="w-12 h-[1px] bg-neutral-800 my-4"></div>

              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                {selectedItem.description[language]}
              </p>
            </div>

            <div className="p-4 border-t border-neutral-800 bg-neutral-950">
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full py-3 bg-neutral-100 text-black font-semibold text-xs tracking-widest uppercase rounded-lg hover:bg-white transition-colors"
              >
                {t.close}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// ============================================================================
// COMPONENTE: LISTA DE PLATILLOS
// ============================================================================
function ItemList({ items, language, t, onSelect }) {
  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <UtensilsCrossed className="w-12 h-12 text-neutral-700 mx-auto mb-3 stroke-[1]" />
        <p className="text-neutral-400 text-sm">{t.noResults}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          className="bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 rounded-xl p-4 transition-all duration-200 cursor-pointer flex justify-between gap-4 group hover:bg-neutral-900 active:scale-[0.99]"
        >
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                {item.tags.includes('chef') && (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-[#C5A880] bg-[#C5A880]/10 border border-[#C5A880]/30 px-2 py-0.5 rounded">
                    <Award className="w-3 h-3" />
                    {language === 'es' ? 'Especial' : 'Special'}
                  </span>
                )}
                {item.tags.includes('promo') && (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                    <Tag className="w-3 h-3" />
                    {language === 'es' ? 'Promo del Mes' : 'Promo'}
                  </span>
                )}
                {item.spicyLevel > 0 && (
                  <span className="inline-flex items-center text-[10px] text-red-400 bg-red-950/30 px-1.5 py-0.5 rounded border border-red-900/40">
                    {'🌶️'.repeat(item.spicyLevel)}
                  </span>
                )}
              </div>

              <h3 className="text-base font-medium text-white group-hover:text-[#C5A880] transition-colors leading-snug">
                {item.name[language]}
              </h3>

              <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed font-light">
                {item.description[language]}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-white tracking-wide">
                {t.currency}{item.price.toFixed(2)}
              </span>
              <span className="text-[11px] text-[#C5A880] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                {language === 'es' ? 'Ver detalle' : 'View detail'} <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-neutral-950 border border-neutral-800 overflow-hidden flex-shrink-0 relative group-hover:border-neutral-700 transition-colors">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name[language]}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-gradient-to-br from-neutral-900 to-neutral-950">
                <UtensilsCrossed className="w-5 h-5 text-neutral-700 mb-1 stroke-[1.2]" />
                <span className="text-[8px] text-neutral-600 font-mono">LA LUNA</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
