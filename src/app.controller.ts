import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe } from '@nestjs/common';
// import { v4 as uuid } from 'uuid';
import {ReportType } from 'src/data';
import { AppService } from './app.service';
import { CreateReportDto } from './dtos/report.dtos'
@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService){};

  @Get()
  getAllReport(@Param('type', new ParseEnumPipe(ReportType)) type: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    ) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  CreateReport(@Body() { amount, source } : CreateReportDto, @Param('type', new ParseEnumPipe(ReportType)) type: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReport(reportType, {amount, source});
  }

  @Put(':id')
  updateReport(
    @Param ('type', new ParseEnumPipe(ReportType)) type: string,
    @Param ('id', ParseUUIDPipe) id: string,
    @Body () body: { amount: number; source: string },
  ) {
      const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
      return this.appService.updateReport(reportType, id, body)
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }
}
