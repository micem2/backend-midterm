"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const petController_1 = require("../controllers/petController");
const router = (0, express_1.Router)();
// Redirect to /pets
router.get('/', petController_1.redirect);
// Shows all pets
router.get('/pets', petController_1.allPets);
// Add new pet
router.get('/pets/new', petController_1.addPetPage);
router.post('/pets/new', petController_1.addPet);
// Edit a single pet item
router.get('/pets/edit/:petId', petController_1.editPetPage);
router.post('/pets/edit/:petId', petController_1.editPet);
// Delete a pet item
router.post('/pets/delete/:petId', petController_1.deletePet);
// Shows a pet item in detail
router.get('/pets/:petId', petController_1.petDetail);
exports.default = router;
