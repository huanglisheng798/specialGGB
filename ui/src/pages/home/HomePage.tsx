import React from 'react';
import styles from './index.less'; 
import { FileTextOutlined, UngroupOutlined, TableOutlined, SettingOutlined,BulbOutlined } from '@ant-design/icons';
import { history } from 'umi';
import '../User/Login/Fall.less'; 

const HomePage = () => {
    const navigateToBasicInfo = (pathname: string) => {
        localStorage.setItem('curpath', pathname);
        history.push('/'+pathname);
    };

    return (
        <div className={styles.container} style={{ backgroundImage: `url(/image/login.jpg)` }}>
            {/* 硬币坠落动画容器 */}
            <div className="coin-fall-container">
                {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className={`coin coin-${index + 1}`}></div>
                ))}
            </div>
            <div className={styles.rotatingCoin}></div>
            <div className={styles.title}>AI驱动数字货币投资辅助系统</div>
            <div className={styles.menuGrid}>
                {/* 左上：基础信息管理 */}
                <div className={`${styles.menuItem} ${styles.topLeft}`}>
                    <button onClick={() => navigateToBasicInfo("basic-info")} className={styles.menuButton}>
                        <FileTextOutlined style={{ fontSize: '5rem' }} />
                        <div>基础信息管理</div>
                    </button>
                </div>

                {/* 中间：业务操作管理 */}
                <div className={`${styles.menuItem} ${styles.center}`}>
                    <button onClick={() => navigateToBasicInfo("warehouse-mng")} className={styles.menuButton}>
                        <SettingOutlined style={{ fontSize: '6rem' }} />
                        <div>业务操作管理</div>
                    </button>
                </div>

                {/* 右上：可视化查询管理 */}
                <div className={`${styles.menuItem} ${styles.topRight}`}>
                    <button onClick={() => navigateToBasicInfo("Get")} className={styles.menuButton}>
                        <TableOutlined style={{ fontSize: '5rem' }} />
                        <div>智能推荐</div>
                    </button>
                </div>

                {/* 左下：智能化集成管理 */}
                <div className={`${styles.menuItem} ${styles.bottomLeft}`}>
                    <button onClick={() => navigateToBasicInfo("GetList")} className={styles.menuButton}>
                        <UngroupOutlined style={{ fontSize: '5rem' }} />
                        <div>虚拟货币行情</div>
                    </button>
                </div>

                {/* 右下：预警报警管理 */}
                <div className={`${styles.menuItem} ${styles.bottomRight}`}>
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