import {useRouter, usePathname} from "next/navigation";
// 클라이언트 사이트 라우팅을 위한 훅.

import {useState, ChangeEvent} from "react";
// 컴포넌트 내부에서 상태 관리 위한 useState 훅.
// onChange 이벤트에 발생하는 이벤트 타입 ChangeEvent.

import {Search} from "lucide-react";
import Link from "next/link";

interface iSearchBar{
    defaultValue: string | null;
    placeholder: string;
}

// 함수형 컴포넌트.
// defaultValue, placeholder는 부모 컴포넌트로부터 받은 prop
export const SearchBar = ({defaultValue, placeholder} : iSearchBar) => {
    const router = useRouter() // 페이지 이동 시 사용.

    const [inputValue, setInputValue] = useState(defaultValue)
    // inputValue는 defaultValue로 초깃값이 세팅된다.

    const pathname = usePathname();

    // 이벤트 핸들러.
    // 입력 필드에 어떤 값이 들어가면 이벤트가 트리거되어서..
    // inputValue에 그 값이 추가된다.
    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        const inputValue = event.target.value;

        setInputValue(inputValue);
    }

    // 검색하는 함수.
    const handleSearch = () => {
        if(inputValue) return router.push(`${pathname}?q=${inputValue}`); // 라우터를 통해 q 로 받은 검색 단어를 포함한 URL로 이동.
        else return router.push("/");
    }

    // 키보드의 어떤 키가 눌렸을 때 실행되는 이벤트 핸들러.
    // 엔터가 눌렸을 때 검색하는 함수를 호출한다.
    const handleKeyPress = (event : {key: any; }) => {
        if(event.key === "Enter") return handleSearch()
    }

    return (
        <div className="search__input border-[4px] border-brand-light border-solid flex flex-row items-center gap-5 p-1 rounded-[15px] w-full max-w-lg mx-auto">
            <input type="text"
                id="inputId"
                placeholder={placeholder}
                value={inputValue ?? ""} onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="bg-[transparent] outline-none border-none w-full py-3 pl-2 pr-3"
            />
            <Link href={`${pathname}?q=${inputValue}`}>
                <Search className="text-brand-dark"/>
            </Link>
        </div>

    )
}