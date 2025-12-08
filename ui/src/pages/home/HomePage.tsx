import React from 'react';
import styles from './index.less'; 
import { UngroupOutlined, TableOutlined, BulbOutlined } from '@ant-design/icons';
import homeJpeg from '@/pages/home/home.jpeg';
import { history } from 'umi'; 

const HomePage = () => {
    const navigateToBasicInfo = (pathname: string) => {
        localStorage.setItem('curpath', pathname);
        history.push('/'+pathname);
    };

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${homeJpeg})` }}>
            <div className={styles.title}>AI驱动数字货币投资辅助系统</div>
            <div className={styles.menuGrid}>


                {/* 右上：可视化查询管理 */}
                <div className={styles.menuItem}>
                    <button onClick={() => navigateToBasicInfo("Get")} className={styles.menuButton}>
                        <TableOutlined style={{ fontSize: '5rem' }} />
                        <div>智能推荐</div>
                    </button>
                </div>

                {/* 左下：智能化集成管理 */}
                <div className={styles.menuItem}>
                    <button onClick={() => navigateToBasicInfo("GetList")} className={styles.menuButton}>
                        <UngroupOutlined style={{ fontSize: '5rem' }} />
                        <div>虚拟货币行情</div>
                    </button>
                </div>

                {/* 右下：预警报警管理 */}
                <div className={styles.menuItem}>
                    <button onClick={() => navigateToBasicInfo("GetListAi")} className={styles.menuButton}>
                        <BulbOutlined style={{ fontSize: '5rem' }} />
                        <div>虚拟货币商店</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;