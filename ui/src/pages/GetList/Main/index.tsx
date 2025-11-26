import React, { useState, useEffect } from 'react';
import { useModel } from '@umijs/max';
import { Card, Table, Button, message, Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { listCryptoPriceInfoPage, refreshCryptoPriceInfo } from '@/services/wms/cryptoPriceInfo';
import styles from './index.less';

interface CryptoPriceInfo {
  id: string;
  rank: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  date: string;
  marketCapUsd?: string;
  volumeUsd24Hr?: string;
}

const CryptoPriceInfoPage: React.FC = () => {
  const [cryptoList, setCryptoList] = useState<CryptoPriceInfo[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [queryParams, setQueryParams] = useState({
    pageNum: 1,
    pageSize: 10
  });

  const { initialState } = useModel('@@initialState');

  // 获取虚拟货币价格信息列表
  const fetchCryptoList = async () => {
    setLoading(true);
    try {
      const res = await listCryptoPriceInfoPage(queryParams);
      setCryptoList(res.rows || []);
      setTotal(res.total || 0);
    } catch (error) {
      message.error('获取虚拟货币价格信息失败');
    } finally {
      setLoading(false);
    }
  };

  // 刷新数据
  const handleRefresh = async () => {
    setButtonLoading(true);
    try {
      await refreshCryptoPriceInfo();
      message.success('数据刷新成功');
      fetchCryptoList();
    } catch (error) {
      message.error('刷新数据失败');
    } finally {
      setButtonLoading(false);
    }
  };

  // 分页变化
  const handlePageChange = (page: number, pageSize: number) => {
    setQueryParams(prev => ({
      ...prev,
      pageNum: page,
      pageSize: pageSize
    }));
  };

  // 初始化数据
  useEffect(() => {
    fetchCryptoList();
  }, [queryParams]);

  // 表格列配置
  const columns = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 80
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 150
    },
    {
      title: '代码',
      dataIndex: 'symbol',
      key: 'symbol',
      width: 100
    },
    {
      title: '价格(USD)',
      dataIndex: 'price',
      key: 'price',
      width: 180,
      render: (text: number) => `$${text.toFixed(2)}`
    },
    {
      title: '市值(USD)',
      dataIndex: 'marketCapUsd',
      key: 'marketCapUsd',
      width: 200,
      render: (text?: string) => text ? `$${(parseFloat(text) / 1e9).toFixed(2)}B` : '-'
    },
    {
      title: '24h成交量(USD)',
      dataIndex: 'volumeUsd24Hr',
      key: 'volumeUsd24Hr',
      width: 200,
      render: (text?: string) => text ? `$${(parseFloat(text) / 1e9).toFixed(2)}B` : '-'
    },
    {
      title: '24h涨跌幅',
      dataIndex: 'changePercent',
      key: 'changePercent',
      width: 150,
      render: (text: number) => {
        const percent = text;
        const color = percent >= 0 ? '#52c41a' : '#ff4d4f';
        return <span style={{ color }}>{percent.toFixed(2)}%</span>;
      }
    },
    {
      title: '更新时间',
      dataIndex: 'date',
      key: 'date',
      width: 200,
      render: (text: string) => new Date(text).toLocaleString()
    }
  ];

  return (
    <div className={styles.cryptoPriceInfoPage}>
      <Card>
        <div className={styles.cardTitle}>
          <h2>虚拟货币价格信息</h2>
          <Space>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              loading={buttonLoading}
              onClick={handleRefresh}
            >
              刷新数据
            </Button>
          </Space>
        </div>
        <Table
          className={styles.table}
          dataSource={cryptoList}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            total: total,
            current: queryParams.pageNum,
            pageSize: queryParams.pageSize,
            onChange: handlePageChange,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100']
          }}
        />
      </Card>
    </div>
  );
};

export default CryptoPriceInfoPage;
