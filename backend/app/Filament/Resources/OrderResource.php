<?php

namespace App\Filament\Resources;

use App\Enums\PaymentMethod;
use App\Filament\Resources\OrderResource\Pages;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Support\Str;
use Filament\Forms\Form;
use Filament\Tables\Table;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-cart';

    protected static ?string $modelLabel = 'Заказ';
    protected static ?string $pluralModelLabel = 'Заказы';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Card::make()->schema([
                Grid::make(2)->schema([
                    TextInput::make('full_name')
                        ->label('ФИО')
                        ->required(),

                    TextInput::make('phone')
                        ->label('Телефон')
                        ->required(),

                    TextInput::make('email')
                        ->label('Email')
                        ->email()
                        ->required(),

                    TextInput::make('address')
                        ->label('Адрес доставки')
                        ->required(),

                    Select::make('payment_method')
                        ->label('Способ оплаты')
                        ->options(PaymentMethod::class)
                        ->required(),

                    Select::make('promocode_id')
                        ->label('Промокод')
                        ->relationship('promocode', 'code')
                        ->searchable()
                        ->nullable(),
                ]),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('ID')
                    ->sortable(),

                TextColumn::make('full_name')
                    ->label('ФИО')
                    ->searchable(),

                TextColumn::make('phone')
                    ->label('Телефон'),

                TextColumn::make('email')
                    ->label('Email'),

                TextColumn::make('payment_method')
                    ->label('Оплата')
                    ->formatStateUsing(fn (PaymentMethod $state) => $state->label()),

                TextColumn::make('promocode.code')
                    ->label('Промокод')
                    ->placeholder('-'),

                TextColumn::make('created_at')
                    ->label('Дата заказа')
                    ->dateTime('d.m.Y H:i'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
