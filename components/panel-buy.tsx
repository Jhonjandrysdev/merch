'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CloseModal } from './icons'
import Image from 'next/image'
import Link from 'next/link'
import { PanelBuyProps } from '../lib/types'
import { useCart } from '../app/Provider'

export default function PanelBuy({ open, setOpen, products }: PanelBuyProps) {
  const { clearLocalStorage, removeProduct } = useCart()

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium text-gray-900 font-amiko'>
                          Shopping cart
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='relative -m-2 p-2 text-gray-400 hover:text-gray-500'
                            onClick={() => setOpen(false)}
                          >
                            <span className='absolute -inset-0.5' />
                            <span className='sr-only'>Close panel</span>
                            <CloseModal />
                          </button>
                        </div>
                      </div>

                      <div className='mt-8'>
                        <div className='flow-root'>
                          <ul
                            role='list'
                            className='-my-6 divide-y divide-gray-200'
                          >
                            {products.map((product) => (
                              <li key={product.id} className='flex py-6'>
                                <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                  <Image
                                    src={product.photo}
                                    alt={product.title}
                                    className='h-full w-full object-cover object-center'
                                    width={200}
                                    height={200}
                                  />
                                </div>

                                <div className='ml-4 flex flex-1 flex-col'>
                                  <div>
                                    <div className='flex justify-between text-base font-medium text-gray-900'>
                                      <h3 className='font-amiko'>
                                        <Link href='#'>{product.title}</Link>
                                      </h3>
                                      <p className='ml-4 font-amiko'>
                                        {product.incrementPrice}
                                      </p>
                                    </div>
                                    <p className='mt-1 text-sm text-gray-500 font-amiko'>
                                      {product.description}
                                    </p>
                                  </div>
                                  <div className='flex flex-1 items-end justify-between text-sm'>
                                    <p className='text-gray-500'>
                                      Qty {product.incrementProduct}
                                    </p>

                                    <div className='flex'>
                                      <button
                                        type='button'
                                        className='font-medium font-amiko hover:text-red-500'
                                        onClick={() =>
                                          removeProduct(product.id)
                                        }
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                      <div className='flex justify-between text-base font-medium text-gray-900'>
                        <p className='font-amiko'>Subtotal</p>

                        {products.length > 0 && (
                          <p className='font-amiko'>
                            {products.reduce(
                              (acc, product) => acc + product.incrementPrice,
                              0,
                            )}
                          </p>
                        )}
                      </div>
                      <p className='mt-0.5 text-sm text-gray-500 font-amiko'>
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className='mt-6'>
                        <Link
                          href='#'
                          className='flex items-center justify-center rounded-md border border-transparent bg-zinc-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-zinc-700 font-amiko'
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                        <p className='font-amiko'>
                          <button
                            type='button'
                            className='font-medium text-zinc-600 hover:text-zinc-500'
                            onClick={clearLocalStorage}
                          >
                            Vaciar carrito
                            <span aria-hidden='true'> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
