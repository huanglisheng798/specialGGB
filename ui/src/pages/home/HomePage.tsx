import React, { useState } from 'react';
import styles from './index.less'; 
import { TableOutlined, UngroupOutlined, BulbOutlined, ReloadOutlined, DatabaseOutlined, BarChartOutlined } from '@ant-design/icons';
import homeJpeg from '@/pages/home/home.jpeg';
import { history } from 'umi'; 
import { message } from 'antd';
import { refreshNews, analyzeNewsWithAI } from '@/services/news';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasNewsData, setHasNewsData] = useState(false);
    
    const navigateToBasicInfo = (pathname: string) => {
        localStorage.setItem('curpath', pathname);
        history.push('/'+pathname);
    };

    // 刷新爬取新闻功能
    const handleRefreshNews = async () => {
        setIsLoading(true);
        try {
            const response = await refreshNews();
            if (response.success) {
                setHasNewsData(true);
                message.success(response.message || '新闻爬取成功');
            } else {
                message.error(response.message || '新闻爬取失败');
            }
        } catch (error) {
            message.error('新闻爬取失败，请稍后重试');
            console.error('刷新新闻失败:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // AI自动分析功能
    const handleAnalyzeNews = async () => {
        if (!hasNewsData) {
            message.warning('请先刷新爬取新闻数据');
            return;
        }
        setIsLoading(true);
        try {
            const response = await analyzeNewsWithAI();
            if (response.success) {
                message.success(response.message || 'AI分析完成');
                // 跳转到分析结果页面
                navigateToBasicInfo('Get');
            } else {
                message.error(response.message || 'AI分析失败');
            }
        } catch (error) {
            message.error('AI分析失败，请稍后重试');
            console.error('AI分析失败:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${homeJpeg})` }}>
            <div className={styles.title}>AI驱动数字货币投资辅助系统</div>
            <div className={styles.menuGrid}>
                {/* 右上：智能推荐 */}
                <div className={`${styles.menuItem} ${styles.topRight}`}>
                    <button onClick={() => navigateToBasicInfo("Get")} className={styles.menuButton}>
                        <TableOutlined style={{ fontSize: '5rem' }} />
                        <div>智能推荐</div>
                    </button>
                </div>

                {/* 中间：新闻爬取 */}
                <div className={`${styles.menuItem} ${styles.center}`}>
                    <button onClick={handleRefreshNews} className={styles.menuButton} disabled={isLoading}>
                        <ReloadOutlined style={{ fontSize: '6rem' }} />
                        <div>刷新爬取新闻</div>
                    </button>
                </div>

                {/* 新增：AI分析 */}
                <div className={`${styles.menuItem} ${styles.topLeft}`}>
                    <button onClick={handleAnalyzeNews} className={styles.menuButton} disabled={isLoading}>
                        <BarChartOutlined style={{ fontSize: '5rem' }} />
                        <div>AI分析新闻</div>
                    </button>
                </div>

                {/* 左下：虚拟货币行情 */}
                <div className={`${styles.menuItem} ${styles.bottomLeft}`}>
                    <button onClick={() => navigateToBasicInfo("GetList")} className={styles.menuButton}>
                        <DatabaseOutlined style={{ fontSize: '5rem' }} />
                        <div>虚拟货币行情</div>
                    </button>
                </div>

                {/* 右下：虚拟货币商店 */}
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