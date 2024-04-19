import { RequestHandler } from "express";
import { Pet } from "../models/pet";
import { nextTick } from "process";

export const redirect: RequestHandler = (req, res, next) => {
    res.redirect('/pets');
}

export const allPets: RequestHandler = async (req, res, next) => {
    let petList: Pet[] = await Pet.findAll();
    res.render('allpets', { petList });
}

export const petDetail: RequestHandler = async (req, res, next) => {
    let itemId = req.params.petId;
    let petItem: Pet | null = await Pet.findByPk(itemId);

    if (petItem) {
        res.render('petdetail', { foundPet: petItem });
    } else {
        res.status(404).render('errorpage', { message: 'Item not found' });
    }
}

export const addPetPage: RequestHandler = (req, res, next) => {
    res.render('addpet');
}

export const addPet: RequestHandler = async (req, res, next) => {
    let newPet: Pet = req.body;
    await Pet.create(newPet);
    res.redirect('/pets')
}

export const editPetPage: RequestHandler = async (req, res, next) => {
    let itemId = req.params.petId;
    let petItem: Pet | null = await Pet.findOne({
        where: { id: itemId }
    });

    if (petItem) {
        res.render('editpage', { foundPet: petItem });
    } else {
        res.status(404).render('error', { message: 'item not found'});
    }
}

export const editPet: RequestHandler = async (req, res, next) => {
    let itemId = req.params.petId;
    let updatedItem: Pet = req.body;

    let [updated] = await Pet.update(updatedItem, {
        where: { id: itemId }
    });

    if (updated === 1) {
        res.redirect('/pets');
    } else {
        res.render('errorpage', { message: 'item could not be updated'});
    }
}

export const deletePet: RequestHandler = async (req, res, next) => {
    let itemId: string = req.params.petId;

    let itemDeleted = await Pet.destroy({
        where: { id: itemId }
    });

    if (itemDeleted) {
        res.redirect('/pets')
    } else {
        res.status(404).render('errorpage', { message: 'cannot find item to delete'});
    }
}