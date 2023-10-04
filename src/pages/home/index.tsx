import { useEffect, useState } from "react";
import { Row, Input, Spin } from "antd";
import { useDebounce } from "usehooks-ts";
import "./styles.scss";
import CardItem from "./card-item";
import { ICommonResponse, call } from "../../api/baseRequest";
import { IProduct } from "../type";
import { v4 } from "uuid";
import { Pagination } from "antd";
const Home = () => {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState<string>("");
    const [listPreducts, setListProduct] = useState<IProduct[]>([]);
    const debounceSearch = useDebounce(search, 800);

    const [page, setPage] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number | undefined>(0);

    const getProductsByPage = async () => {
        try {
            setLoading(true);
            const res = (await call(`products/getAll`, "GET", {}, false, "", false, {
                params: { page, size: 15 },
            })) as ICommonResponse<{ content: IProduct[]; totalPages: number }>;
            setListProduct(res.body.data.content);
            setTotalPage(res.body.data.totalPages);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    const getProductsByName = async () => {
        try {
            setLoading(true);
            const res = (await call(`products/findByName/${debounceSearch}`, "GET", {})) as ICommonResponse<IProduct[]>;
            console.log(res);
            setListProduct(res.body.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getProductsByPage();
    }, [page]);
    useEffect(() => {
        debounceSearch.length ? getProductsByName() : getProductsByPage();
    }, [debounceSearch]);
    return (
        <div className="mx-[50px]">
            <Row className="flex justify-center py-3 items-center">
                <label className=" font-medium mr-2">Tìm kiếm </label>
                <Input
                    placeholder="Nhập tên sản phẩm cần tìm"
                    style={{ width: 300 }}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Row>
            <Row className="my-5">
                <strong className="text-[17px]">Danh sách sản phẩm :</strong>
            </Row>
            {!loading ? (
                <div className="products-wrap">
                    {listPreducts?.map((item: IProduct) => {
                        return <CardItem product={item} key={v4()} />;
                    })}
                </div>
            ) : (
                <div className="flex justify-center">
                    <Spin size="large" />
                </div>
            )}

            <Row className="pagination">
                {debounceSearch.length === 0 ? (
                    <Pagination
                        defaultCurrent={1}
                        total={totalPage ? totalPage * 10 : 0}
                        onChange={(e) => setPage(e)}
                    />
                ) : (
                    <p className=" text-center">Không có sản phẩm nào</p>
                )}
            </Row>
        </div>
    );
};

export default Home;
