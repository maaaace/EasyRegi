import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import {Button, Toast} from 'antd-mobile'



import WorkExp from './work';
import EduExp from './education'

export default class OhterInfo extends React.Component {
    static contextTypes = {
        profile: PropTypes.object,
        updateProfile: PropTypes.func
    }
    
    prevStep(){
        this.saveForTempory(0);
        this.props.prev();
    }
    sumitAll(){
        this.saveForTempory(0);
        if(this.context.profile.otherInfo.workExps.length && this.context.profile.otherInfo.edus.length){
            this.props.handleSubmit();
        }  
    }
    saveForTempory(pFlag = 1){
        let wFlag, eFlag = false;
        let { workF, eduF } = this.refs;
        let workFs,eduFs = [];
        workF.validateFields(async (err, values)=>{
             if (!!err) return
             //set value to context 
             //rangetime set config
             wFlag = true;
             let keys = workF.getFieldValue('keys')
             workFs = [Object.assign({},{
                 companyName : workF.getFieldValue('title'),
                 date : [workF.getFieldValue('rangeTime'),workF.getFieldValue('rangeTime_end')],
                 title : workF.getFieldValue('position'),
                 salaryRange : workF.getFieldValue('salary'),
             })];
             
             keys.map((key, index) => {
                 let fmObj = Object.assign({},{
                    companyName : workF.getFieldValue('title_' + key),
                    date : [workF.getFieldValue('rangeTime_' + key), workF.getFieldValue('rangeTime_end_' + key)],
                    title : workF.getFieldValue('position_' + key),
                    salaryRange : workF.getFieldValue('salary_' + key),
                 });
                 workFs.push(fmObj);
             })
        });
        eduF.validateFields(async (err, values)=>{
             if (!!err) return
             //set value to context
             //rangetime set config
             eFlag = true
             let keys = eduF.getFieldValue('keys');
             eduFs = [Object.assign({},{
                 colledgeName : eduF.getFieldValue('title'),
                 date : [eduF.getFieldValue('erangeTime'), eduF.getFieldValue('erangeTime_end')],
                 major : eduF.getFieldValue('position'),
                 isGraduated : eduF.getFieldValue('grad'),
             })];
             
             keys.map((key, index) => {
                 let fmObj = Object.assign({},{
                    colledgeName : eduF.getFieldValue('title_'+ key),
                    date : [eduF.getFieldValue('erangeTime_'+ key), eduF.getFieldValue('erangeTime_end_'+ key)],
                    major : eduF.getFieldValue('position_'+ key),
                    isGraduated : eduF.getFieldValue('grad_'+ key),
                 });
                 eduFs.push(fmObj);
             })
        });
        if(wFlag && eFlag){
            this.context.updateProfile({otherInfo:{workExps:workFs,wkeys:workF.getFieldValue('keys'),edus:eduFs,ekeys:eduF.getFieldValue('keys')},flag:3});
            if(!!pFlag)Toast.success('暂存成功!');
        }
    }
    /*componentDidMount(){
        let {workExps,edus} = this.context.profile.otherInfo;
        let { workF, eduF } = this.refs;
        if(workExps.length){
            workExps.map((wk,idx)=>{
                if(idx){
                    workF.setFieldsValue({
                        ['companyName_' + idx] : wk.companyName,
                        ['date_' + idx] : wk.date,
                        ['title_' + idx] : wk.title,
                        ['salaryRange_' + idx] : wk.salaryRange
                    })  
                }else{
                    workF.setFieldsValue({
                        companyName : wk.companyName,
                        date : wk.date,
                        title : wk.title,
                        salaryRange : wk.salaryRange
                    })
                }
            });
        }
        if(edus.length){
            edus.map((wk,idx)=>{
            if(idx){
                eduF.setFieldsValue({
                    ['colledgeName_' + idx] : wk.colledgeName,
                    ['date_' + idx] : wk.date,
                    ['major_' + idx] : wk.majors,
                    ['isGraduated_' + idx] : wk.isGraduated
                })  
            }else{
                eduF.setFieldsValue({
                    colledgeName : wk.colledgeName,
                    date : wk.date,
                    major : wk.major,
                    isGraduated : wk.isGraduated
                })
            }
            })
        }
        
        
    }*/
    render(){
        let { workExps,edus,wkeys,ekeys } = this.context.profile.otherInfo;
        console.log(ekeys,wkeys);
        return (
            <div key='exp_cntr'>
                <WorkExp workExps={workExps} wkeys={wkeys} ref='workF' />
                <EduExp edus={edus} ekeys={ekeys} ref='eduF' />
                <div style={{textAlign:'center', marginTop:'15px'}}>
                    <Button style={{ marginRight: 8 }} onClick={this.prevStep.bind(this)}>上一步</Button>
                    <Button type="primary" onClick={this.sumitAll.bind(this)}>确认提交</Button>
                </div>
            </div>
        )
    }
}