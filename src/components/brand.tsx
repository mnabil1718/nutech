import Logo from "@/assets/Logo.png"

export type BrandProps = {
    width?: number;
    height?: number;
}

const Brand = ({ width = 30, height = 30 }: BrandProps) => {
    return (
        <div className="relative">
            <img
                src={Logo}
                className="object-contain"
                width={width}
                height={height}
            />
        </div>
    )
}

export default Brand
