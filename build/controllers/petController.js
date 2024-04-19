"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = exports.editPet = exports.editPetPage = exports.addPet = exports.addPetPage = exports.petDetail = exports.allPets = exports.redirect = void 0;
const pet_1 = require("../models/pet");
const redirect = (req, res, next) => {
    res.redirect('/pets');
};
exports.redirect = redirect;
const allPets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let petList = yield pet_1.Pet.findAll();
    res.render('allpets', { petList });
});
exports.allPets = allPets;
const petDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let itemId = req.params.petId;
    let petItem = yield pet_1.Pet.findByPk(itemId);
    if (petItem) {
        res.render('petdetail', { foundPet: petItem });
    }
    else {
        res.status(404).render('errorpage', { message: 'Item not found' });
    }
});
exports.petDetail = petDetail;
const addPetPage = (req, res, next) => {
    res.render('addpet');
};
exports.addPetPage = addPetPage;
const addPet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let newPet = req.body;
    yield pet_1.Pet.create(newPet);
    res.redirect('/pets');
});
exports.addPet = addPet;
const editPetPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let itemId = req.params.petId;
    let petItem = yield pet_1.Pet.findOne({
        where: { id: itemId }
    });
    if (petItem) {
        res.render('editpage', { foundPet: petItem });
    }
    else {
        res.status(404).render('error', { message: 'item not found' });
    }
});
exports.editPetPage = editPetPage;
const editPet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let itemId = req.params.petId;
    let updatedItem = req.body;
    let [updated] = yield pet_1.Pet.update(updatedItem, {
        where: { id: itemId }
    });
    if (updated === 1) {
        res.redirect('/pets');
    }
    else {
        res.render('errorpage', { message: 'item could not be updated' });
    }
});
exports.editPet = editPet;
const deletePet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let itemId = req.params.petId;
    let itemDeleted = yield pet_1.Pet.destroy({
        where: { id: itemId }
    });
    if (itemDeleted) {
        res.redirect('/pets');
    }
    else {
        res.status(404).render('errorpage', { message: 'cannot find item to delete' });
    }
});
exports.deletePet = deletePet;
