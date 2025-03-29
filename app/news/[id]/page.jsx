export default async function Page({ params }) {
    const { id } = await params
    return (
        <div className="grid grid-cols-3 grid-rows-[10vh_auto] h-screen w-full gap-2 p-2">
            {/* Image spanning 3 columns */}
            <div className="col-span-3 row-span-1">
                <img
                    src="https://via.placeholder.com/1200x200"
                    alt="Header Image"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/* Div spanning 2 columns in the second row */}
            <div className="col-span-2 bg-blue-500 flex items-center justify-center text-white text-xl rounded-lg">
                Content 1 {id}
            </div>

            {/* Div occupying remaining 1 column in second row */}
            <div className="bg-green-500 flex items-center justify-center text-white text-xl rounded-lg">
                Content 2
            </div>
        </div>
    );
}
  
