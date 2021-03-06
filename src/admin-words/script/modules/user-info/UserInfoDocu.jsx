import React from "react";
import request from "../../sevice/request.js";
import "bootstrap/dist/js/bootstrap.js";
import ReactTooltip from "react-tooltip";
import WordsDoc from "./WordsDoc.jsx";
import utils from "../../utils.js";

export default class UserInfoDocu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], docInfo: {}, nodata: "none" };
  }

  componentDidMount() {
    let me = this;
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
    request.sendRequstNew(
      "/admin/listDocument",
      { userId: this.props.userId },
      function(result) {
        if (result.code != "200") {
          me.setState({ data: [], nodata: "" });
        } else {
          let data = result.result.data;
          me.setState({ data: data, nodata: "none" });
        }
      }
    );
  }

  deleteDocBydoc(doc, e) {
    this.setState({ docInfo: doc });
    let me = this;
    request.sendRequstNew(
      "/admin/deleteDoc",
      { wordsId: doc.docId, userId: doc.userId },
      function(resp) {
        if (resp.code === "200") {
          let data = me.state.data;
          me.setState({ data: utils.removeElement(data, words) });
        } else {
          alert(resp.result);
        }
      }
    );
  }

  getWordsBydoc(doc, e) {
    this.setState({ docInfo: doc });
  }
  render() {
    const wordsDoc = (
      <div className="row">
        <WordsDoc docInfo={this.state.docInfo} />
      </div>
    );
    const modelEle = (
      <div
        className="modal fade"
        id="exampleModalLong"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog dv-modal" role="document">
          <div className="modal-content" style={{ width: 1000 }}>
            <div className="modal-header">
              <h5 className="modal-title">{"关键字信息"}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" id="modalForm">
              {wordsDoc}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                // onClick={this.modalAction.bind(this, "register")}
              >
                {"确定"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                {"取消"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    let th = (
      <thead className="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col"> 操作</th>
          <th scope="col" className="name">
            名称
          </th>
          <th scope="col" className="originalName">
            原始文档名
          </th>
          <th scope="col" className="uuid">
            文档ID
          </th>
          <th scope="col" className="wordsCount">
            关键字数量
          </th>
          <th scope="col" className="state">
            状态
          </th>
          <th scope="col" className="createTime">
            创建时间
          </th>
          <th scope="col" className="updateTime">
            最近打开时间
          </th>
          <th scope="col" className="expireTime">
            失效时间
          </th>
        </tr>
      </thead>
    );
    let td = (
      <tbody>
        {this.state.data.map((pro, index) => {
          let realState = "不可用";
          if (pro.state == 0) {
            realState = "可操作";
          }
          return (
            <tr key={pro.docId}>
              <td>{index}</td>
              <td>
                <div
                  className="btn-group-sm"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-secondary dv-mr10"
                    data-toggle="modal"
                    data-target="#exampleModalLong"
                    onClick={this.deleteDocBydoc.bind(this, pro)}
                  >
                    删除
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-toggle="modal"
                    data-target="#exampleModalLong"
                    onClick={this.getWordsBydoc.bind(this, pro)}
                  >
                    关键词
                  </button>
                </div>
              </td>
              <td>
                <span className="dv-td-text-longer" data-tip={pro.name}>
                  {pro.name}
                </span>
                <ReactTooltip />
              </td>
              <td>
                <span className="dv-td-text-longer" data-tip={pro.originalName}>
                  {pro.originalName}
                </span>
                <ReactTooltip />
              </td>
              <td>{pro.uuid}</td>
              <td>{pro.wordsCont}</td>
              <td>{realState}</td>
              <td>{utils.formatDate(pro.createDate)}</td>
              <td>{utils.formatDate(pro.modifyDate)}</td>
              <td>{pro.expireTime}</td>
            </tr>
          );
        })}
      </tbody>
    );
    return (
      <div className="container  dv-mt5">
        {modelEle}
        <div className="row">
          <div className="col-12">
            <div className="row dv-user-info-main">
              <table className="table table-responsive-sm">
                {th}

                {td}
              </table>
              <div
                className="container row justify-content-center"
                style={{ display: this.state.nodata }}
              >
                没有数据！
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
