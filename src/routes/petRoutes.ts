import { Router } from "express";
import { redirect, allPets, petDetail, addPetPage, addPet, editPetPage, editPet, deletePet } from "../controllers/petController";

const router = Router();

// Redirect to /pets
router.get('/', redirect);

// Shows all pets
router.get('/pets', allPets);

// Add new pet
router.get('/pets/new', addPetPage);
router.post('/pets/new', addPet);

// Edit a single pet item
router.get('/pets/edit/:petId', editPetPage);
router.post('/pets/edit/:petId', editPet);

// Delete a pet item
router.post('/pets/delete/:petId', deletePet);

// Shows a pet item in detail
router.get('/pets/:petId', petDetail);

export default router;

