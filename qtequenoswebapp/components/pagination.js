import Link from "next/link";

const Pagination = ({pagination}) => {

    const {page, pageCount, total} = pagination;
    const isfirstPage = page === 1;
    const islastPage = page === pageCount; 
    const prevPage = page - 1;
    const nextPage = page + 1;

    const prePageUrl = isfirstPage ? '#' : `?page=${prevPage}`;
    const nextPageUrl = islastPage ? '#' : `?page=${nextPage}`;


    return (
        <>
            <div className="flex flex-col items-center my-6">
            {/* Help text */}
            <span className="text-sm text-gray-700 dark:text-gray-400">
                Mostrando <span className="font-semibold text-gray-900 dark:text-white">{page}</span> a <span className="font-semibold text-gray-900 dark:text-white">{pageCount}</span> de <span className="font-semibold text-gray-900 dark:text-white">{total}</span> compras realiadas
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
                {/* Buttons */}
                <Link href={prePageUrl} disabled={isfirstPage} className={`${isfirstPage ? "pointer-events-none opacity-50" : ""} flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-[#d3850f] rounded-s hover:bg-[#7c5b2a]`}>
                    <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                    </svg>
                    Anterior
                </Link>
                <Link href={nextPageUrl} disabled={islastPage} className={`${islastPage ? "pointer-events-none opacity-50" : ""} flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-[#d3850f] border-0 border-s border-gray-700 rounded-e hover:bg-[#7c5b2a]`}>
                    Siguiente
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                </Link>
            </div>
            </div>
        </>
    )
}

export default Pagination