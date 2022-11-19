import { component$, Resource } from '@builder.io/qwik';
import type {DocumentHead, RequestHandler} from '@builder.io/qwik-city';
import {Link, useEndpoint} from '@builder.io/qwik-city';
import Button from "../components/Button/Button";
import {Product} from "@prisma/client";
import {prisma} from "../server/db/client";

export const onGet: RequestHandler<Product[]> = async ({params})=>{

  const products = await prisma.product.findMany({take: 10})


  return products
}





export default component$(() => {


  const data = useEndpoint<Product[]>()



  return (
    <div>
      <h1>SomeTitle</h1>
      <Button/>
      <Resource
          value={data}
          onPending={() => <div>Loading...</div>}
          onRejected={() => <div>Error</div>}
          onResolved={(product) => (
              <>
                {product.map(value=>{
                  return(
                      <div>
                        <h1>{value.name}</h1>
                      </div>
                  )
                })}
              </>
          )}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
