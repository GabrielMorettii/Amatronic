import { FakeBrandsRepository } from "@modules/goods/repositories/fakes/FakeBrandsRepository";
import { FakeCategoriesRepository } from "@modules/goods/repositories/fakes/FakeCategoriesRepository";
import { FakeGoodImageRepository } from "@modules/goods/repositories/fakes/FakeGoodImageRepository";
import { FakeGoodsRepository } from "@modules/goods/repositories/fakes/FakeGoodsRepository";
import { LocalStorageProvider } from "@shared/container/providers/StorageProvider/implementations/LocalStorageProvider";
import AppError from "@shared/errors/AppError";
import { CreateGoodUseCase } from "../Good/createGood/CreateGoodUseCase";
import { UploadGoodImageUseCase } from "./UploadGoodImageUseCase";

let createGoodUseCase: CreateGoodUseCase;
let uploadGoodImageUseCase: UploadGoodImageUseCase;
let fakeGoodsRepository: FakeGoodsRepository
let fakeCategoriesRepository: FakeCategoriesRepository
let fakeBrandsRepository: FakeBrandsRepository
let storageProvider: LocalStorageProvider
let fakeGoodImageRepository: FakeGoodImageRepository

describe('Update Good Image Use Case', ()=>{
  beforeEach(()=>{
    fakeGoodsRepository = new FakeGoodsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeBrandsRepository = new FakeBrandsRepository();
    fakeGoodImageRepository = new FakeGoodImageRepository();
    storageProvider = new LocalStorageProvider();
    uploadGoodImageUseCase = new UploadGoodImageUseCase(fakeGoodImageRepository, fakeGoodsRepository, storageProvider);
    createGoodUseCase = new CreateGoodUseCase(fakeGoodsRepository, fakeCategoriesRepository, fakeBrandsRepository);
  })

  it('Should be able to upload a good image', async ()=>{
    const category = await fakeCategoriesRepository.create('Category Name', 'Category Desc')

    const brand = await fakeBrandsRepository.create('Test Brand')

    const good = await createGoodUseCase.execute({
      name: "Iphone X",
      amount: 9,
      price: 1000.32,
      description: "Iphone da 10 geração",
      category_id: `${category.id}`,
      brand_id:  `${brand.id}`
    })

    await uploadGoodImageUseCase.execute({
      good_id: good.id,
      images_name: ["test image 1", "test image 2"]
    })

    const findImages = await fakeGoodImageRepository.findByGoodId(good.id);

    expect(findImages.length).toBe(2);
  })

  it('Should not be able to upload an image to a non-existent good', async ()=>{
    await expect(
      uploadGoodImageUseCase.execute({
        good_id: '123',
        images_name: ["test image 1", "test image 2"]
      })
    ).rejects.toEqual(new AppError("The good does not exists", 404))
  })

  it('Should be able to delete all previous good images', async ()=>{
    const category = await fakeCategoriesRepository.create('Category Name', 'Category Desc')

    const brand = await fakeBrandsRepository.create('Test Brand')

    const good = await createGoodUseCase.execute({
      name: "Iphone X",
      amount: 9,
      price: 1000.32,
      description: "Iphone da 10 geração",
      category_id: `${category.id}`,
      brand_id:  `${brand.id}`
    })

    await uploadGoodImageUseCase.execute({
      good_id: good.id,
      images_name: ["test image 1", "test image 2"]
    })

    await uploadGoodImageUseCase.execute({
      good_id: good.id,
      images_name: ["test image 3", "test image 4"]
    })

    const findImages = await fakeGoodImageRepository.findByGoodId(good.id);

    expect(findImages.length).toBe(2);
    expect(findImages[0].name).toEqual('test image 3')
  })
})
